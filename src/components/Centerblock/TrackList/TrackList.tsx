'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';

import {
  getAllTracks,
  getSelectionById,
  getAllFavoriteTracks,
} from '@/services/tracksApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlayList,
  setUniqueFilters,
  setSelectionSequence,
  setFavoriteTracks,
} from '@/store/features/trackSlice';

import Track from '../Track/Track';

import { getUniqueValuesByKey } from '@/services/utilities';
import { reAuthentication } from '@/services/reAuthentication';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

export default function TrackList({ selection }: { selection: string }) {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const tracks: TrackItemInterface[] = useAppSelector((state) => {
    return state.tracks.currentPlayList;
  });

  const favoriteTracks: TrackItemInterface[] = useAppSelector((state) => {
    return state.tracks.favoriteTracks;
  });

  const filteredTracks: TrackItemInterface[] | null = useAppSelector(
    (state) => {
      return state.tracks.filteredPlayList;
    },
  );

  const { access, refresh } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    async function initialTracksState() {
      const allTracks = await getAllTracks();
      if (access) {
        reAuthentication(
          (newToken) => getAllFavoriteTracks(newToken || access),
          refresh,
          dispatch,
        ).then((response) => {
          const favoriteSelectionTrackIds = response.data.map(
            (item) => item._id,
          );

          const currentSelection: TrackItemInterface[] = allTracks.data.filter(
            (track) => favoriteSelectionTrackIds.includes(track._id),
          );

          dispatch(setFavoriteTracks(currentSelection));
        });
      }
    }

    initialTracksState();
  }, []);

  useEffect(() => {
    async function tracksCultivation() {
      try {
        const allTracks = await getAllTracks();

        dispatch(setCurrentPlayList(allTracks.data));
        dispatch(
          setUniqueFilters({
            authors: getUniqueValuesByKey(allTracks.data, 'author'),
            genres: getUniqueValuesByKey(allTracks.data, 'genre'),
          }),
        );
        dispatch(
          setSelectionSequence(allTracks.data.map((track) => track._id)),
        );

        if (selection === 'selection') {
          const selection = await getSelectionById(params.id);

          const selectionTracksIds = selection.data.items;

          const currentSelection: TrackItemInterface[] = allTracks.data.filter(
            (track) => selectionTracksIds.includes(track._id),
          );

          dispatch(setCurrentPlayList(currentSelection));
          dispatch(
            setUniqueFilters({
              authors: getUniqueValuesByKey(currentSelection, 'author'),
              genres: getUniqueValuesByKey(currentSelection, 'genre'),
            }),
          );
          dispatch(
            setSelectionSequence(currentSelection.map((track) => track._id)),
          );
        }

        if (selection === 'favorite-tracks' && access) {
          reAuthentication(
            (newToken) => getAllFavoriteTracks(newToken || access),
            refresh,
            dispatch,
          ).then((response) => {
            const favoriteSelectionTrackIds = response.data.map(
              (item) => item._id,
            );

            const currentSelection: TrackItemInterface[] =
              allTracks.data.filter((track) =>
                favoriteSelectionTrackIds.includes(track._id),
              );

            dispatch(setCurrentPlayList(currentSelection));
            dispatch(
              setUniqueFilters({
                authors: getUniqueValuesByKey(currentSelection, 'author'),
                genres: getUniqueValuesByKey(currentSelection, 'genre'),
              }),
            );
            dispatch(
              setSelectionSequence(currentSelection.map((track) => track._id)),
            );
          });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage('Проверьте интернет-соединение и попробуйте позже');
          } else {
            setErrorMessage('Неизвестная ошибка');
          }
        }
      }
    }

    tracksCultivation();
  }, [favoriteTracks, selection, params.id]);

  return (
    errorMessage ||
    (filteredTracks ? filteredTracks : tracks).map((trackItem) => {
      return <Track key={trackItem._id} trackItem={trackItem} />;
    })
  );
}

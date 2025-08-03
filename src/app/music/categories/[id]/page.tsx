'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';

import TrackList from '@/components/Centerblock/TrackList/TrackList';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlayListName,
  setPagePlayList,
  setSelectionSequence,
} from '@/store/features/trackSlice';

import { getSelectionById } from '@/services/tracksApi';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

export default function TrackListContent() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { access } = useAppSelector((state) => state.authentication);
  const { currentPlayList, pagePlayList, filteredPlayList, favoritePlayList } =
    useAppSelector((state) => state.tracks);

  const [tracks, setTracks] = useState<TrackItemInterface[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function initialTracksState() {
      if (params.id === 'favorite-tracks' && access) {
        dispatch(setCurrentPlayListName('Избранное'));
        dispatch(setPagePlayList(favoritePlayList));
        dispatch(
          setSelectionSequence(favoritePlayList.map((track) => track._id)),
        );
      } else {
        try {
          const selection = await getSelectionById(params.id);
          const selectionTracksIds = selection.data.items;
          const currentSelection: TrackItemInterface[] = currentPlayList.filter(
            (track) => selectionTracksIds.includes(track._id),
          );

          dispatch(setCurrentPlayListName(selection.data.name));
          dispatch(setPagePlayList(currentSelection));
          dispatch(
            setSelectionSequence(currentSelection.map((track) => track._id)),
          );
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error);
            if (error.response) {
              setErrorMessage(error.response.data.message);
            } else if (error.request) {
              setErrorMessage('Подборки временно недоступны');
            } else {
              setErrorMessage('Неизвестная ошибка');
            }
          }
        }
      }
    }

    initialTracksState();
  }, [currentPlayList, favoritePlayList]);

  useEffect(() => {
    setTracks(filteredPlayList.length ? filteredPlayList : pagePlayList);
  }, [pagePlayList, filteredPlayList, favoritePlayList]);

  return errorMessage ? errorMessage : <TrackList tracks={tracks} />;
}

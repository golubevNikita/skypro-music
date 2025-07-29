'use client';
import { useEffect, useState } from 'react';

import TrackList from '@/components/Centerblock/TrackList/TrackList';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlayListName,
  setPagePlayList,
  setSelectionSequence,
} from '@/store/features/trackSlice';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

export default function TrackListContent() {
  const dispatch = useAppDispatch();

  const { currentPlayList, pagePlayList, filteredPlayList, favoritePlayList } =
    useAppSelector((state) => state.tracks);

  const [tracks, setTracks] = useState<TrackItemInterface[]>([]);

  useEffect(() => {
    dispatch(setCurrentPlayListName('Треки'));
    dispatch(setPagePlayList(currentPlayList));
    dispatch(setSelectionSequence(currentPlayList.map((track) => track._id)));

    setTracks(currentPlayList);
  }, [currentPlayList]);

  useEffect(() => {
    setTracks(filteredPlayList.length ? filteredPlayList : pagePlayList);
  }, [pagePlayList, filteredPlayList, favoritePlayList]);

  return <TrackList tracks={tracks} />;
}

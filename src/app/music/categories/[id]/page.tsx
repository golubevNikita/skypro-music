'use client';

import { useParams } from 'next/navigation';

import TrackList from '@/components/Centerblock/TrackList/TrackList';

export default function TrackListContent() {
  const params = useParams<{ id: string }>();

  return (
    <TrackList
      selection={
        params.id === 'favorite-tracks' ? 'favorite-tracks' : 'selection'
      }
    />
  );
}

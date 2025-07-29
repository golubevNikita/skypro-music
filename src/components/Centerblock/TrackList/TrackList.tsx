import Track from '../Track/Track';

import { useAppSelector } from '@/store/store';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

export default function TrackList({
  tracks,
}: {
  tracks: TrackItemInterface[];
}) {
  const pagePlayList = useAppSelector((state) => {
    return state.tracks.pagePlayList;
  });

  return (tracks || pagePlayList).map((trackItem) => {
    return <Track key={trackItem._id} trackItem={trackItem} />;
  });
}

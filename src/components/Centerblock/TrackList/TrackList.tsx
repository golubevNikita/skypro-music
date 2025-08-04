import Track from '../Track/Track';

import { useAppSelector } from '@/store/store';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

export default function TrackList({
  tracks,
}: {
  tracks: TrackItemInterface[];
}) {
  const { pagePlayList, tracksError } = useAppSelector((state) => state.tracks);

  return tracksError
    ? tracksError
    : (tracks || pagePlayList).map((trackItem) => {
        return <Track key={trackItem._id} trackItem={trackItem} />;
      });
}

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

export const releaseDatesFilters: string[] = [
  'По умолчанию',
  'Сначала новые',
  'Сначала старые',
];

export function getUniqueValuesByKey(
  arr: TrackItemInterface[],
  key: keyof TrackItemInterface,
): string[] {
  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((el) => {
        if (el) {
          uniqueValues.add(el);
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  return Array.from(uniqueValues);
}

export function formatTime(durationInSeconds: number) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  const twoDigitSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${twoDigitSeconds}`;
}

export function timeProgerssInfo(
  currentTime: number,
  totalTime: number | undefined,
) {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
}

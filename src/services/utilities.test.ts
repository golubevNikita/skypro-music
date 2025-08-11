import { data } from '@/data';
import {
  getUniqueValuesByKey,
  formatTime,
  timeProgerssInfo,
} from './utilities';

describe('getUniqueValuesByKey', () => {
  // Получение уникальных значений
  it('массив уникальных названий треков', () => {
    expect(getUniqueValuesByKey(data, 'author')).toStrictEqual([
      'Alexander Nakarada',
      'Frank Schroter',
      'Kevin Macleod',
      'Mixkit',
      '-',
      'Waltz Piano',
      'Winniethemoog',
    ]);
  });

  it('массив уникальных жанров', () => {
    expect(getUniqueValuesByKey(data, 'genre')).toStrictEqual([
      'Классическая музыка',
      'Электронная музыка',
      'Рок музыка',
    ]);
  });

  it('пустой массив при передаче аргументом пустого массива', () => {
    expect(getUniqueValuesByKey([], 'author')).toStrictEqual([]);
  });
});

describe('formatTime', () => {
  // Формат отображения длительности трека:
  it('добавление 0 перед количеством секунд, если число меньше 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });

  it('добавление 0 перед секундами, если общее время меньше 1 минуты', () => {
    expect(formatTime(35)).toBe('0:35');
  });

  it('переданный аргумент - 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});

describe('timeProgerssInfo', () => {
  // Формат отображения длительности трека:
  it('представление текущего времени воспроизведения трека / общей длительности трека', () => {
    expect(timeProgerssInfo(35, 61)).toBe('0:35 / 1:01');
  });
});

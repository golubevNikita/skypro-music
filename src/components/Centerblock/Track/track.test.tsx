import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Track from './Track';

import ReduxProvider from '@/store/ReduxProvider';

import { formatTime } from '@/services/utilities';

import { data } from '@/data';

describe('Track component', () => {
  test('Отображение данных трека на странице', () => {
    render(
      <ReduxProvider>
        <Track trackItem={data[0]} />
      </ReduxProvider>,
    );
    // отрисовка автора трека
    expect(screen.getAllByText(data[0].author).length).toBeGreaterThan(0);
    // отрисовка названия трека
    expect(screen.getAllByText(data[0].name).length).toBeGreaterThan(0);
    // отрисовка альбома
    expect(screen.getAllByText(data[0].album).length).toBeGreaterThan(0);
    // отрисовка корректного отображения длительности трека
    expect(
      screen.getAllByText(formatTime(data[0].duration_in_seconds)).length,
    ).toBeGreaterThan(0);
  });
});

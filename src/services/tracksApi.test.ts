import axios from 'axios';

import { getAllTracks, getSelectionById } from './tracksApi';

import {
  TrackItemsPromiseInterface,
  SelectionByIdPromiseInterface,
} from '@/sharedInterfaces/sharedInterfaces';

import { data } from '@/data';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('TracksApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAllTracks', async () => {
    const mockData: TrackItemsPromiseInterface = {
      success: true,
      data: data,
    };

    (axios as unknown as jest.Mock).mockResolvedValue({
      data: mockData,
    });

    const result = await getAllTracks();

    expect(mockAxios).toHaveBeenCalledWith(
      expect.stringContaining('/catalog/track/all/'),
    );
    expect(result).toEqual(mockData);
  });

  it('getAllTracks error', async () => {
    (axios as unknown as jest.Mock).mockRejectedValue(new Error('Error'));

    await expect(getAllTracks()).rejects.toThrow('Error');
  });

  it('getSelectionById', async () => {
    const id: string = '4';

    const mockData: SelectionByIdPromiseInterface = {
      success: true,
      data: {
        _id: Number(id),
        name: 'Инди-заряд',
        items: [10, 13, 18, 25, 30, 27, 31],
        owner: [1],
        __v: 0,
      },
    };

    (axios as unknown as jest.Mock).mockResolvedValue({
      data: mockData,
    });

    const result = await getSelectionById(id);

    expect(mockAxios).toHaveBeenCalledWith(
      expect.stringContaining(`/catalog/selection/${id}/`),
    );
    expect(result).toEqual(mockData);
  });

  it('getSelectionById error', async () => {
    const id: string = '4';

    (axios as unknown as jest.Mock).mockRejectedValue(new Error('Error'));

    await expect(getSelectionById(id)).rejects.toThrow('Error');
  });
});

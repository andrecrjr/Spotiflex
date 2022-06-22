import { getTrackListContent } from '@/components/services';
import { ISpotifyAlbum, ISpotifyPlaylist } from 'types';
import playlistData from '@/mocks/playlistMock';
import { Response } from 'node-fetch';

describe('Services test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(
      JSON.stringify({
        access_token: '',
        token_type: '',
        expires_in: 0,
        scope: '',
      })
    );
  });
  it('it should fetch playlist spotify', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(playlistData));
    const tracks = await getTrackListContent('playlists', 'drama');
    expect(tracks).toStrictEqual<ISpotifyAlbum>(playlistData);
    expect(tracks).not.toStrictEqual(null);
  });
});

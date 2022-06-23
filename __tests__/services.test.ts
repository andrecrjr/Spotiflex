import { getTrackListContent, getLatestAndGenres } from '@/components/services';
import playlistData from '@/mocks/playlistMock.json';
import categoriesMock from '@/mocks/categoriesMock.json';
import featuredPlaylists from '@/mocks/featuredPlaylistsMock.json';
import newReleasesMock from '@/mocks/newReleasesMock.json';

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
    expect(tracks).toStrictEqual(playlistData);
    expect(tracks).not.toStrictEqual(null);
  });
  it('it should getLatestAndGenres', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(featuredPlaylists))
      .mockResponseOnce(JSON.stringify(categoriesMock))
      .mockResponseOnce(JSON.stringify(newReleasesMock));
    const data = await getLatestAndGenres();
    expect(data).toStrictEqual({
      props: {
        playlistsGenre: featuredPlaylists,
        latestReleases: newReleasesMock,
        featuredPlaylists: categoriesMock,
      },
    });
  });
});

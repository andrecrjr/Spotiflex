import { getTrackListContent, getLatestAndGenres } from '@/components/services';
import playlistData from '@/mocks/playlistMock.json';
import playlistsGenre from '@/mocks/categoriesMock.json';
import featuredPlaylists from '@/mocks/featuredPlaylistsMock.json';
import latestReleases from '@/mocks/newReleasesMock.json';
import * as helper from '../helper';

const mockAuth = {
  access_token: '',
  token_type: '',
  expires_in: 0,
  scope: '',
};

jest.spyOn(helper, 'getPublicAuth').mockImplementation(async () => mockAuth);

describe('Services test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('it should fetch playlist spotify', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(playlistData));
    const tracks = await getTrackListContent('playlists', 'drama');
    expect(tracks).toStrictEqual(playlistData);
    expect(tracks).not.toStrictEqual(null);
  });

  it('it should return props when uses getLatestAndGenres', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(playlistsGenre));
    fetchMock.mockResponseOnce(JSON.stringify(latestReleases));
    fetchMock.mockResponseOnce(JSON.stringify(featuredPlaylists));
    const data = await getLatestAndGenres();
    expect(data.props.featuredPlaylists).toStrictEqual(
      featuredPlaylists.playlists.items
    );
    expect(data.props.latestReleases).toStrictEqual(
      latestReleases.albums.items
    );
    expect(data.props.playlistsGenre).toStrictEqual(
      playlistsGenre.categories.items
    );
    expect(data.props).toStrictEqual({
      featuredPlaylists: featuredPlaylists.playlists.items,
      latestReleases: latestReleases.albums.items,
      playlistsGenre: playlistsGenre.categories.items,
    });
  });
});

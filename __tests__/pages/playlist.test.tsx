import Playlist from '@/pages/playlist/[id]';
import { renderWithWrappers } from '@/utils/AllProviders';
import onePlaylist from '@/mocks/onlyOnePlaylist.json';
import { screen } from '@testing-library/dom';
import { getServerSideProps } from '@/pages/playlist/[id]';
import { GetServerSidePropsContext } from 'next';
import categoriesMock from '@/mocks/categoriesMock.json';
import { ParsedUrlQuery } from 'querystring';
import * as helper from '@/utils/helper';

const mockAuth = {
  access_token: '',
  token_type: '',
  expires_in: 0,
  scope: '',
};

jest.spyOn(helper, 'getPublicAuth').mockImplementation(async () => mockAuth);
describe('Playlist Page test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should show playlist songs', () => {
    const { container } = renderWithWrappers(
      <Playlist playlist={onePlaylist} />
    );
    expect(screen.getByText('ASMR Sleep Whispers')).toBeInTheDocument();
    expect(container.children[0]).toMatchSnapshot();
  });
  it('should fetch playlist in server side props', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(categoriesMock));
    const context = {
      params: { id: 'drama' } as ParsedUrlQuery,
    };

    const response = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    expect(response).toStrictEqual({ props: { playlist: categoriesMock } });
  });

  it('should return empty in server side props', async () => {
    const context = {
      params: { id: 'drama' } as ParsedUrlQuery,
    };

    const response = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    expect(response).toStrictEqual({ props: { playlist: [] } });
  });
});

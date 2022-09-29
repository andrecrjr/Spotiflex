import Playlist from '@/pages/playlist/[id]';
import { renderWithWrappers } from '@/utils/AllProviders';
import onePlaylist from '@/mocks/onlyOnePlaylist.json';
import { screen } from '@testing-library/dom';
import { getServerSideProps } from '@/pages/playlist/[id]';
import { GetServerSidePropsContext } from 'next';
import categoriesMock from '@/mocks/categoriesMock.json';
import { ParsedUrlQuery } from 'querystring';
import * as service from '@/components/services';

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
  // it('should fetch playlist in server side propss', async () => {
  //   jest.spyOn(service, 'getDataSpotify').mockResolvedValue(async () => {
  //     return Promise.resolve(categoriesMock);
  //   });
  //   const context = {
  //     params: { id: 'drama' } as ParsedUrlQuery,
  //   };

  //   const response = await getServerSideProps(
  //     context as GetServerSidePropsContext
  //   );

  //   expect(response).toEqual({ props: { playlist: categoriesMock } });
  // });
});

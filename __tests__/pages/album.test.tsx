import { renderWithWrappers } from '../../utils/AllProviders';
import Album from '@/pages/album/[id]';
import { screen } from '@testing-library/react';
import albumMock from '@/mocks/oneHotMinuteAlbumMock.json';

describe('Album Page Test', () => {
  let wrapperContainer: HTMLElement;
  beforeEach(() => {
    const { container } = renderWithWrappers(<Album album={albumMock} />);
    wrapperContainer = container;
  });
  it('should render album in Album page', () => {
    expect(
      screen.getByText('One Hot Minute (Deluxe Edition)')
    ).toBeInTheDocument();
    expect(wrapperContainer.children[0]).toMatchSnapshot();
    expect(
      wrapperContainer.querySelector('.header__album--title').textContent
    ).toBe('One Hot Minute (Deluxe Edition)');
    expect(
      wrapperContainer.querySelector('.header__album--artist').textContent
    ).toBe('Red Hot Chili Peppers');
  });
  it('should have all song titles from the mock', () => {
    const allTracks = wrapperContainer.querySelectorAll(
      '.track--name.big-title'
    );
    allTracks.forEach((item, index) => {
      expect(item.textContent).toBe(albumMock.tracks.items[index].name);
    });
  });
});

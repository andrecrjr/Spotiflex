import { renderWithWrappers } from '@/utils/AllProviders';
import { fireEvent } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

import oneHotMinuteAlbumMock from '@/mocks/oneHotMinuteAlbumMock.json';
import Album from '@/pages/album/[id]';

jest
  .spyOn(window.HTMLMediaElement.prototype, 'pause')
  .mockImplementation(() => ({}));

jest
  .spyOn(window.HTMLMediaElement.prototype, 'play')
  .mockImplementation(async () => {
    return Promise.resolve();
  });

describe('Tracklist Album test', () => {
  let wrapperContainer: HTMLElement;
  let playTrack: HTMLElement;
  beforeEach(async () => {
    const { container } = renderWithWrappers(
      <Album album={oneHotMinuteAlbumMock} />
    );
    wrapperContainer = container;
    playTrack = wrapperContainer.querySelector('.player--control');
    await act(async () => {
      fireEvent.click(playTrack);
    });
  });

  it('should play the first album track', async () => {
    const artistFooter = wrapperContainer.querySelector(
      '.track--footer__track-artist'
    );
    const trackTitleFooter = wrapperContainer.querySelector(
      '.track--footer__title'
    );
    expect(trackTitleFooter.textContent).toBe('Warped');
    expect(artistFooter.textContent).toBe('Red Hot Chili Peppers');
  });

  it('should go to next two album tracks', async () => {
    const nextPlayButton = wrapperContainer.querySelector(
      '.player--control[data-control=next]'
    );
    await act(async () => {
      fireEvent.click(nextPlayButton);
    });
    const trackTitleFooter = wrapperContainer.querySelector(
      '.track--footer__title'
    );
    const artistTracklistFooter = wrapperContainer.querySelector(
      '.track--footer__track-artist'
    );
    expect(trackTitleFooter.textContent).toBe('Aeroplane');
    await act(async () => {
      fireEvent.click(nextPlayButton);
    });
    expect(trackTitleFooter.textContent).toBe('Deep Kick');
    expect(artistTracklistFooter.textContent).toBe('Red Hot Chili Peppers');
  });
});

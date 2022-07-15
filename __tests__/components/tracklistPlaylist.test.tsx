import { renderWithWrappers } from '@/utils/AllProviders';
import onePlaylist from '@/mocks/onlyOnePlaylist.json';
import { fireEvent } from '@testing-library/dom';
import Playlist from '@/pages/playlist/[id]';
import { act } from 'react-dom/test-utils';

jest
  .spyOn(window.HTMLMediaElement.prototype, 'pause')
  .mockImplementation(() => {});

jest
  .spyOn(window.HTMLMediaElement.prototype, 'play')
  .mockImplementation(async () => {});

describe('Tracklist Playlist test', () => {
  let wrapperContainer: HTMLElement;
  let playTrack: HTMLElement;
  beforeEach(async () => {
    // before each test render my playlist then click in play button
    const { container } = renderWithWrappers(
      <Playlist playlist={onePlaylist} />
    );
    wrapperContainer = container;
    playTrack = wrapperContainer.querySelector('.player--control');
    await act(async () => {
      fireEvent.click(playTrack);
    });
  });
  it('should play first track from playlist', async () => {
    expect(
      wrapperContainer.querySelector('.track--footer__title').textContent
    ).toBe('Into Dreams');
    expect(
      wrapperContainer.querySelector('.track--footer__track-artist').textContent
    ).toBe('Summer ASMR');
  });
  it('should go to next track on playlist', async () => {
    const nextPlayButton = wrapperContainer.querySelector(
      '.player--control[data-control=next]'
    );
    await act(async () => {
      fireEvent.click(nextPlayButton);
    });

    expect(
      wrapperContainer.querySelector('.track--footer__title').textContent
    ).toBe(
      'Super sleepy attention, close positive whispers, inaudible whispers Pt.1'
    );
    expect(
      wrapperContainer.querySelector('.track--footer__track-artist').textContent
    ).toBe('RoseASMR');
  });
  it('should go to previous track on playlist', async () => {
    const previousTrackButton = wrapperContainer.querySelector(
      '.player--control[data-control=previous]'
    );
    await act(async () => {
      fireEvent.click(previousTrackButton);
    });

    expect(
      wrapperContainer.querySelector('.track--footer__title').textContent
    ).toBe('Sending Tingle Sleep Vibes Pt.1');
    expect(
      wrapperContainer.querySelector('.track--footer__track-artist').textContent
    ).toBe('Catplant ASMR');
    expect(
      wrapperContainer.querySelector('.track--footer__title').textContent
    ).not.toBe('Sending Tingle Sleep Vibes Pt.2');
  });
});

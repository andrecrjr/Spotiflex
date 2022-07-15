import { useReducer } from 'react';
import { renderWithWrappers } from '@/utils/AllProviders';
import onePlaylist from '@/mocks/onlyOnePlaylist.json';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import Playlist from '@/pages/playlist/[id]';
import { act } from 'react-dom/test-utils';

jest
  .spyOn(window.HTMLMediaElement.prototype, 'pause')
  .mockImplementation(() => {});

jest
  .spyOn(window.HTMLMediaElement.prototype, 'play')
  .mockImplementation(async () => {});

describe('Tracklist Playlist test', () => {
  it('should play first track from tracklist', async () => {
    const { container } = renderWithWrappers(
      <Playlist playlist={onePlaylist} />
    );
    const firstPlayButton = container.querySelector('.player--control');
    await act(async () => {
      fireEvent.click(firstPlayButton);
    });
    //song Into Dreams
    //artist Summer ASMR
    expect(container.querySelector('.track--footer__title').textContent).toBe(
      'Into Dreams'
    );
    expect(container);
    expect(
      container.querySelector('.track--footer__track-artist').textContent
    ).toBe('Summer ASMR');
  });
  it('should go to next track on tracklist', async () => {
    const { container } = renderWithWrappers(
      <Playlist playlist={onePlaylist} />
    );
    const firstPlayButton = container.querySelector('.player--control');
    await act(async () => {
      fireEvent.click(firstPlayButton);
    });
    const nextPlayButton = container.querySelector(
      '.player--control[data-control=next]'
    );
    await act(async () => {
      fireEvent.click(nextPlayButton);
    });

    expect(container.querySelector('.track--footer__title').textContent).toBe(
      'Super sleepy attention, close positive whispers, inaudible whispers Pt.1'
    );
    expect(
      container.querySelector('.track--footer__track-artist').textContent
    ).toBe('RoseASMR');
  });
  it('should go to previous track on tracklist', async () => {
    const { container } = renderWithWrappers(
      <Playlist playlist={onePlaylist} />
    );
    const firstPlayButton = container.querySelector('.player--control');
    await act(async () => {
      fireEvent.click(firstPlayButton);
    });
    const previousTrackButton = container.querySelector(
      '.player--control[data-control=previous]'
    );
    await act(async () => {
      fireEvent.click(previousTrackButton);
    });

    expect(container.querySelector('.track--footer__title').textContent).toBe(
      'Sending Tingle Sleep Vibes Pt.1'
    );
    expect(
      container.querySelector('.track--footer__track-artist').textContent
    ).toBe('Catplant ASMR');
    expect(
      container.querySelector('.track--footer__title').textContent
    ).not.toBe('Sending Tingle Sleep Vibes Pt.2');
  });
});

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
    // artist Summer ASMR
    expect(container.querySelector('.track--footer__title').textContent).toBe(
      'Into Dreams'
    );
    expect(container);
    expect(
      container.querySelector('.track--footer__track-artist').textContent
    ).toBe('Summer ASMR');
  });
});

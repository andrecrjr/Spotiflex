import { renderWithWrappers } from '@/utils/AllProviders';
import onePlaylist from '@/mocks/onlyOnePlaylist.json';
import { screen } from '@testing-library/dom';
import Playlist from '@/pages/playlist/[id]';

describe('Playlist Page test', () => {
  it('should show playlist songs', async () => {
    const { container } = renderWithWrappers(
      <Playlist playlist={onePlaylist} />
    );
    const firstPlayButton = await container.querySelector(".")
    const playButton = await screen.findByRole('button');
    playButton.click();
    
  });
});

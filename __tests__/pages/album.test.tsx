import { renderWithWrappers } from '../../utils/AllProviders';
import Album from '@/pages/album/[id]';
import { screen } from '@testing-library/react';
import albumMock from '@/mocks/oneHotMinuteAlbumMock.json';

describe('Album Page Test', () => {
  it('should render album in Album page', () => {
    const { container } = renderWithWrappers(<Album album={albumMock} />);
    expect(
      screen.getByText('One Hot Minute (Deluxe Edition)')
    ).toBeInTheDocument();
    expect(container.children[0]).toMatchSnapshot();
  });
});

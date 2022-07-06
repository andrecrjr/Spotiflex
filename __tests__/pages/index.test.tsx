import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import { renderWithWrappers } from '../../utils/AllProviders';

describe('Home Page test', () => {
  it('should render Homepage', () => {
    const { container } = renderWithWrappers(<Home />);
    expect(screen.getByText('Spotiflex')).toBeInTheDocument();
    expect(container.children[0]).toMatchSnapshot();
  });
});

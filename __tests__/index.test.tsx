import { render, screen } from '@testing-library/react';
import MyApp from '@/pages/_app';


describe('Main Page', () => {
  it('should render spotifly', async () => {
    render(<MyApp />);
    expect(screen.getByDisplayValue("Spotiflex")).toBeInTheDocument()
  });
});

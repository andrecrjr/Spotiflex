import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MyApp from '@/pages/_app';
import Home from "@/pages/"
import {  renderWithWrappers } from '../utils/AllProviders';
import userEvent from '@testing-library/user-event'

describe('Home Page', () => {
  it('should render home', () => {
    const {container} = renderWithWrappers(<Home/>);
    expect(screen.getByText("Spotiflex")).toBeInTheDocument()
    expect(container.children[0]).toMatchSnapshot()
  });

});

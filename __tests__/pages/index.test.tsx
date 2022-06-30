import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from "@/pages/index"
import {  renderWithWrappers } from '../../utils/AllProviders';

import Explorer from '@/pages/explorer';


import Album from '@/pages/album/[id]';

describe('Home Page', () => {
  it('should render Homepage', () => {
    const {container} = renderWithWrappers(<Home/>);
    expect(screen.getByText("Spotiflex")).toBeInTheDocument()
    expect(container.children[0]).toMatchSnapshot()
  });
 
 
});

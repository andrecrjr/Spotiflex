
import {  renderWithWrappers } from '../../utils/AllProviders';
import Explorer from '@/pages/explorer';
import { screen } from '@testing-library/react';
import playlistsGenre from '@/mocks/categoriesMock.json';
import featuredPlaylists from '@/mocks/featuredPlaylistsMock.json';
import latestReleases from '@/mocks/newReleasesMock.json';

describe("Explorer Page Test",()=>{

    it("should render playlists, latest and featured on Explorer page", ()=>{
        const {container} = renderWithWrappers(<Explorer
        playlistsGenre={playlistsGenre.categories.items}
        latestReleases={latestReleases.albums.items}
        featuredPlaylists={featuredPlaylists.playlists.items}
        />);
        expect(screen.getByText("Explorer")).toBeInTheDocument()
        expect(container.children[0]).toMatchSnapshot()
      })
    
})
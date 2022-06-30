import Playlist from "@/pages/playlist/[id]"
import { renderWithWrappers } from "@/utils/AllProviders"
import onePlaylist from '@/mocks/onlyOnePlaylist.json'
import { screen } from "@testing-library/dom"

describe("Playlist Page test", ()=>{
    it("should show playlist songs", ()=>{
       const {container} = renderWithWrappers(<Playlist playlist={onePlaylist}/>)
       expect(screen.getByText("ASMR Sleep Whispers")).toBeInTheDocument()
       expect(container.children[0]).toMatchSnapshot()
    })
})
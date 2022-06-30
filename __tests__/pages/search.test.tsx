import Search from '@/pages/search/[query]';
import { screen } from '@testing-library/dom';
import {  renderWithWrappers } from '@/utils/AllProviders';
import searchMock from '@/mocks/searchTaylorMock.json'

describe("Search Page test", ()=>{
    it("should search taylor swift",()=>{
        const {container} = renderWithWrappers(<Search query={"Taylor Swift"} 
        resp={searchMock} />)
        expect(screen.getByText(`Artists found with "Taylor Swift"`)).toBeInTheDocument()
        expect(screen.getByText(`Albums found with "Taylor Swift"`)).toBeInTheDocument()
        expect(container.children[0]).toMatchSnapshot()
    })
})
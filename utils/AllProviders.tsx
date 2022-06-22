
import Layout from "@/components/Layout"
import { UserPlaylistWrapper } from "@/components/contextWrapper/UserPlaylist"
import TransactionPage from "@/components/TransactionPage"
import { render, RenderOptions } from "@testing-library/react"
import { ReactElement } from "react"

const AllProviders = ({children}) =>{
    return (
        <UserPlaylistWrapper>
            <Layout>
                <TransactionPage>{children}</TransactionPage>
            </Layout>
        </UserPlaylistWrapper>
    )
  }

export const renderWithWrappers = (component:ReactElement, options:RenderOptions={}) =>{
    return (
        render(component, {wrapper:AllProviders, ...options})
    )
}
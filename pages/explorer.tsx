import React from 'react';
import { GetServerSideProps } from 'next';
import { getLatestAndGenres } from '../components/services';
import SongList from '../components/Layout/List';
import { ISpotifyAlbum, PlaylistItems } from '../types';
import LayoutMetaSEO from '../components/Layout/LayoutMetaSEO';


const Explorer: React.FC<{
  playlistsGenre?: PlaylistItems[];
	latestReleases?: ISpotifyAlbum[];
	isChild?:boolean
}> = ({ playlistsGenre, latestReleases,isChild=false }) => {
	return (
		<>
		{ !isChild &&  <LayoutMetaSEO title='Spotiflex Explorer' />}
			<section className='block' id='explorer'>
				<h1>Explorer</h1>
        <SongList
          listType={{ playlists: playlistsGenre }}
          name={'Genres'}
          iconsWithTitle={true}
        />
        <SongList
          listType={{ albums: latestReleases }}
          name={'Latest Album Releases'}
          iconsWithTitle={false}
				/>
				</section>
		</>
	)
}
			
export const getServerSideProps: GetServerSideProps = async () => {
  
  return await getLatestAndGenres()
};


export default Explorer;
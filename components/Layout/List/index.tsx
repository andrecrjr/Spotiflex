import React from "react";
import { PlaylistItems, ISpotifyAlbum } from "../../../types";

import Carousel from "./Carousel";

const SongList: React.FC<{
  listType: { playlists?: PlaylistItems[]; albums?: ISpotifyAlbum[] };
  name: string;
  iconsWithTitle: boolean;
}> = ({ listType: { playlists = [], albums = [] }, name, iconsWithTitle }) => {
  console.log(albums);
  return (
    <section className='block--horizontal-list'>
      <h1 className='block--title'>{name}:</h1>
      <Carousel
        listType={{ playlists, slugName: "top" }}
        iconsWithTitle={true}
      />
      <Carousel
        listType={{ albums, slugName: "latestAlbums" }}
        iconsWithTitle={false}
      />
    </section>
  );
};

export default SongList;

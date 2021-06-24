import React from "react";
import { useRouter } from "next/router";
import { PlaylistItems, ISpotifyAlbum } from "../../../types";
import Image from "next/image";
import Carousel from "./Carousel";

const SongList: React.FC<{
  listType: { playlists?: PlaylistItems[]; album?: ISpotifyAlbum[] };
  name: string;
  iconsWithTitle: boolean;
}> = ({ listType: { playlists, album }, name, iconsWithTitle }) => {
  return (
    <section className='block--horizontal-list'>
      <h1 className='block--title'>{name}:</h1>
      <Carousel listType={{ playlists }} name={name} iconsWithTitle={true} />
      <Carousel listType={{ album }} name={name} iconsWithTitle={false} />
    </section>
  );
};

const GeneralPlaylist: React.FC<{
  album: PlaylistItems;
}> = ({ album }) => {
  const router = useRouter();

  return (
    <>
      <li className='block__pane--space' key={album.id}>
        <div
          className='block__pane--genre'
          onClick={() => router.push(`/genre/${album.id}`)}
        >
          <Image src={album.icons[0].url} alt={album.name} layout='fill' />
          <h3 className='block__pane--title'>{album.name}</h3>
        </div>
      </li>
    </>
  );
};

export default SongList;

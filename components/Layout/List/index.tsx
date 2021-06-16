import React from "react";
import { useRouter } from "next/router";
import { PlaylistItems, ISpotifyAlbum } from "../../../types";
import { ISpotifyPlaylist } from "../../../types/spotifyTypes";

const SongList: React.FC<{
  listType: { playlists?: PlaylistItems[]; album?: ISpotifyAlbum[] };
  name: string;
  iconsWithTitle: boolean;
}> = ({ listType: { playlists, album }, name, iconsWithTitle }) => {
  return (
    <section>
      <h1 className='block--title'>Playlist {name}:</h1>
      <ul className='block__pane'>
        {iconsWithTitle &&
          playlists &&
          playlists?.map((item) => <GeneralPlaylist album={item} />)}

        {!iconsWithTitle &&
          album &&
          album.map((item) => (
            <a href={item.href}>
              <style jsx>{`
                .block__genre--section {
                  background: url(${item.images[0].url});
                  background-size: 150px 150px;
                }
              `}</style>
              <li className='block__genre--section' key={item.id}></li>
            </a>
          ))}
      </ul>
    </section>
  );
};

const GeneralPlaylist: React.FC<{
  album: PlaylistItems;
}> = ({ album }) => {
  const router = useRouter();

  return (
    <>
      <style jsx>
        {`
          .block__pane--genre {
            background: url(${album.icons[0].url});
            background-repeat: no-repeat;
            background-size: 150px 150px;
          }
        `}
      </style>
      <li className='block__pane--space' key={album.id}>
        <div
          className='block__pane--genre'
          onClick={() => router.push(`/genre/${album.id}`)}
        >
          <h4 className='block__pane--title'>{album.name}</h4>
        </div>
      </li>
    </>
  );
};

export default SongList;

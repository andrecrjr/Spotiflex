import { PlaylistItems, ISpotifyAlbum } from "../../../types";
import { useRouter } from "next/router";
import Image from "next/image";

export const GeneralPlaylist: React.FC<{
  album: PlaylistItems;
}> = ({ album }) => {
  const router = useRouter();

  return (
    <>
      <div className='block__pane--space' key={album.id}>
        <div
          className='block__pane--genre'
          onClick={() => router.push(`/genre/${album.id}`)}
        >
          <Image src={album.icons[0].url} alt={album.name} layout='fill' />
          <h3 className='block__pane--title'>{album.name}</h3>
        </div>
      </div>
    </>
  );
};

import { useRouter } from 'next/router';
import Image from 'next/image';
import { PlaylistItems, ISpotifyAlbum, ISpotifyPlaylist } from '../../../types';

export const GeneralPlaylist: React.FC<{
  album: PlaylistItems;
}> = ({ album }) => {
  const router = useRouter();

  return (
    <div className='block__pane--space' key={album.id}>
      <div
        className='block__pane--genre'
        onClick={() => router.push(`/genre/${album.id}`)}
      >
        <Image src={album.icons[0].url} alt={album.name} layout='fill' />
        <h3 className='block__pane--title'>{album.name}</h3>
      </div>
    </div>
  );
};

export const GeneralAlbum: React.FC<{
  album: ISpotifyAlbum | ISpotifyPlaylist;
  slugName?: string;
}> = ({ album }) => {
  const router = useRouter();
  return (
    <div
      className='block__pane--space'
      data-album={album.id}
      key={album.id}
      onClick={() => router.push(`/album/${album.id}`)}
    >
      <div className='block__pane--genre'>
        <Image src={album.images[0].url} alt={album.name} layout='fill' />
      </div>
      <section className='block__pane--item-description'>
        <h2 className='block__pane--item-title'>{album.name}</h2>
      </section>
    </div>
  );
};

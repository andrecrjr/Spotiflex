import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  PlaylistItems,
  ISpotifyAlbum,
  ISpotifyPlaylist,
  ISpotifyArtist,
} from '../../../types';

export const GeneralPlaylist: React.FC<{
  album: PlaylistItems;
}> = ({ album }) => {
  const router = useRouter();

  return (
    <div className='block__pane--space'>
      <div
        className='block__pane--genre'
        onClick={() => router.push(`/genre/${album.id}`)}
      >
        <Image
          src={album.icons[0].url}
          className='pane--pic'
          alt={album.name}
          layout='fill'
        />
        <h3 className='block__pane--title'>{album.name}</h3>
      </div>
    </div>
  );
};

export const GeneralAlbum: React.FC<{
  album: ISpotifyAlbum | ISpotifyPlaylist | ISpotifyArtist;
  slugName?: string;
}> = ({ album }) => {
  const router = useRouter();
  return (
    <div
      className='block__pane--space'
      onClick={() => router.push(`/${album.type}/${album.id}`)}
    >
      <div className='block__pane--genre'>
        {album?.images?.length > 0 && (
          <Image
            src={album?.images[0].url}
            className='pane--pic'
            alt={album?.name}
            layout='fixed'
            width='140px'
            height='140px'
          />
        )}
      </div>
      <div className='block__pane--item-description'>
        <h2 className='block__pane--item-title'>{album?.name}</h2>
      </div>
    </div>
  );
};

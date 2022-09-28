import { useRouter } from 'next/router';
import Image from 'next/image';
import { PlaylistItems, ISpotifyAlbum } from '../../../types';

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
        <h2 className='block__pane--item-title'>{album.name}</h2>
      </div>
    </div>
  );
};

export const GenericAlbumContent: React.FC<{
  album: ISpotifyAlbum & PlaylistItems;
  slugName?: string;
}> = ({ album }) => {
  const router = useRouter();
  return (
    <div
      className='block__pane--space'
      onClick={() => router.push(`/${album.type || 'genre'}/${album.id}`)}
    >
      <div className='block__pane--genre'>
        {(!!album?.images || !!album?.icons) && (
          <Image
            src={!!album.images ? album?.images[0]?.url : album?.icons[0].url}
            className='pane--pic'
            alt={album?.name}
            layout='fill'
          />
        )}
      </div>
      <h2 className='block__pane--item-title'>{album?.name}</h2>
    </div>
  );
};

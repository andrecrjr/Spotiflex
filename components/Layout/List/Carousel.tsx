import { PlaylistItems, ISpotifyAlbum } from '../../../types';
import { useCarousel } from '../../hooks/useCarousel';
import { ISpotifyArtist, Track } from '../../../types/spotifyTypes';
import CarouselButton from './CarouselButton';
import { GenericAlbumContent } from './Playlist';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

const Carousel: React.FC<{
  listType: {
    playlists?: PlaylistItems[] | Track[];
    albums?: ISpotifyAlbum[];
    artists?: ISpotifyArtist[];
    slugName?: string;
  };
  iconsWithTitle: boolean;
}> = ({
  listType: { playlists = [], albums = [], artists = [], slugName },
  iconsWithTitle,
}) => {
  const { block_pane, nextStep, previousStep } = useCarousel();

  return (
    <>
      {playlists.length > 0 && (
        <>
          <ul className='slider__wrapper' ref={block_pane}>
            <div className='block__pane' data-carousel={`carousel-${slugName}`}>
              {iconsWithTitle &&
                playlists &&
                playlists?.map((item, index) => (
                  <GenericAlbumContent key={index} album={item} />
                ))}
            </div>
          </ul>
          <div className='slider__wrapper--controls'>
            <CarouselButton ref={nextStep} controlSide={'next'}>
              <BsChevronRight className='slider__arrow' />
            </CarouselButton>
            <CarouselButton ref={previousStep} controlSide={'previous'}>
              <BsChevronLeft className='slider__arrow' />
            </CarouselButton>
          </div>
        </>
      )}

      {artists.length > 0 && (
        <>
          <ul className='slider__wrapper' ref={block_pane}>
            <div className='block__pane' data-carousel={`carousel-${slugName}`}>
              {iconsWithTitle &&
                artists &&
                artists.map((item, index) => (
                  <GenericAlbumContent key={index} album={item} />
                ))}
            </div>
          </ul>
          <div className='slider__wrapper--controls'>
            <CarouselButton ref={nextStep} controlSide={'next'}>
              <BsChevronRight className='slider__arrow' />
            </CarouselButton>
            <CarouselButton ref={previousStep} controlSide={'previous'}>
              <BsChevronLeft className='slider__arrow' />
            </CarouselButton>
          </div>
        </>
      )}

      {albums.length > 0 && (
        <>
          <ul className='slider__wrapper' ref={block_pane}>
            <div className='block__pane' data-carousel={`carousel-${slugName}`}>
              {albums.map((item) => (
                <div key={item.id} style={{ display: 'contents' }}>
                  <GenericAlbumContent album={item} slugName={slugName} />
                </div>
              ))}
            </div>
          </ul>
          <div className='slider__wrapper--controls'>
            <CarouselButton ref={nextStep} controlSide={'next'}>
              <BsChevronRight className='slider__arrow' />
            </CarouselButton>
            <CarouselButton ref={previousStep} controlSide={'previous'}>
              <BsChevronLeft className='slider__arrow' />
            </CarouselButton>
          </div>
        </>
      )}
    </>
  );
};

export default Carousel;

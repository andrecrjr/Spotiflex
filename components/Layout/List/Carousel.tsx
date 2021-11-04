import React, { useRef, useEffect } from 'react';
import { PlaylistItems, ISpotifyAlbum } from '../../../types';
import { ISpotifyArtist, Track } from '../../../types/spotifyTypes';
import CarouselButton from './CarouselButton';
import { GeneralPlaylist, GeneralAlbum } from './Playlist';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';
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
  const block_pane = useRef<HTMLUListElement>();
  const nextStep = useRef<HTMLButtonElement>();
  const previousStep = useRef<HTMLButtonElement>();

  const width = useRef(0);

  useEffect(() => {
    const scrollWidth = block_pane.current?.scrollWidth;
    const windowPane = block_pane.current?.clientWidth;
    const carouselChildrenLength =
      block_pane.current?.firstChild.childNodes.length;
    const sizeOfChildren = scrollWidth / carouselChildrenLength;
    const totalCarouselChildrenLength = sizeOfChildren * carouselChildrenLength;
    const nextPath = windowPane / sizeOfChildren;

    const { current: divCarousel } = block_pane;

    const blockPane = divCarousel?.children as HTMLCollectionOf<HTMLElement>;

    if (previousStep.current && width.current === 0) {
      previousStep.current.style.opacity = '0.4';
    }

    nextStep.current?.addEventListener('click', (e) => {
      e.preventDefault();
      if (scrollWidth - windowPane >= -totalCarouselChildrenLength) {
        const newWidth = width.current - sizeOfChildren * Math.floor(nextPath);
        blockPane[0].style.transform = `translateX(${newWidth}px)`;
        width.current = newWidth;
        if (Math.abs(newWidth) >= scrollWidth - windowPane) {
          nextStep.current.style.opacity = '0.4';
          nextStep.current.style.pointerEvents = 'none';
          nextStep.current.style.cursor = 'unset';
          previousStep.current.style.opacity = '1';
        } else {
          previousStep.current.style.opacity = '1';
          nextStep.current.style.pointerEvents = 'visible';
          nextStep.current.style.cursor = 'pointer';
        }
      }
    });

    previousStep.current?.addEventListener('click', (e) => {
      e.preventDefault();
      if (scrollWidth + windowPane > width.current && width.current !== 0) {
        width.current = width.current + sizeOfChildren * Math.floor(nextPath);
        blockPane[0].style.transform = `translateX(${width.current}px)`;
        if (Math.abs(width.current) > 0) {
          previousStep.current.style.opacity = '1';
          nextStep.current.style.opacity = '1';
          nextStep.current.style.pointerEvents = 'visible';
        } else {
          nextStep.current.style.opacity = '1';
          previousStep.current.style.opacity = '0.4';
        }
      }
    });
  }, []);

  return (
    <>
      {playlists.length > 0 && (
        <>
          <ul className='slider__wrapper' ref={block_pane}>
            <div className='block__pane' data-carousel={`carousel-${slugName}`}>
              {iconsWithTitle &&
                playlists &&
                playlists?.map((item, index) => (
                  <GeneralPlaylist key={index} album={item} />
                ))}
            </div>
          </ul>
          <div className='slider__wrapper--controls'>
            <CarouselButton ref={nextStep} controlSide={'next'}>
              <CgArrowRightO />
            </CarouselButton>
            <CarouselButton ref={previousStep} controlSide={'previous'}>
              <CgArrowLeftO />
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
                  <GeneralAlbum key={index} album={item} />
                ))}
            </div>
          </ul>
          <div className='slider__wrapper--controls'>
            <CarouselButton ref={nextStep} controlSide={'next'}>
              <CgArrowRightO />
            </CarouselButton>
            <CarouselButton ref={previousStep} controlSide={'previous'}>
              <CgArrowLeftO />
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
                  <GeneralAlbum album={item} slugName={slugName} />
                </div>
              ))}
            </div>
          </ul>
          <div className='slider__wrapper--controls'>
            <CarouselButton ref={nextStep} controlSide={'next'}>
              <CgArrowRightO />
            </CarouselButton>
            <CarouselButton ref={previousStep} controlSide={'previous'}>
              <CgArrowLeftO />
            </CarouselButton>
          </div>
        </>
      )}
    </>
  );
};

export default Carousel;

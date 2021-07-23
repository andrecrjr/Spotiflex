import React, { useRef, useState, useLayoutEffect, forwardRef } from 'react';
import { PlaylistItems, ISpotifyAlbum } from '../../../types';
import CarouselButton from './CarouselButton';
import { GeneralPlaylist, GeneralAlbum } from './Playlist';

const Carousel: React.FC<{
  listType: {
    playlists?: PlaylistItems[];
    albums?: ISpotifyAlbum[];
    slugName?: string;
  };
  iconsWithTitle: boolean;
}> = ({
  listType: { playlists = [], albums = [], slugName },
  iconsWithTitle,
}) => {
  // const [width, setWidth] = useState<number>(0);
  const block_pane = useRef<HTMLUListElement>();
  const nextStep = useRef<HTMLButtonElement>();
  const previousStep = useRef<HTMLButtonElement>();
  const width = useRef(0);

  useLayoutEffect(() => {
    const scrollWidth = block_pane.current?.scrollWidth;
    const windowPane = block_pane.current?.clientWidth;
    const { current: divCarousel } = block_pane;

    const blockPane =
      divCarousel && (divCarousel.children as HTMLCollectionOf<HTMLElement>);

    if (width.current === 0 && previousStep.current) {
      previousStep.current.style.display = 'none';
    }

    nextStep.current?.addEventListener('click', (e) => {
      e.preventDefault();
      if (scrollWidth - windowPane >= Math.abs(width.current)) {
        const newWidth = width.current - windowPane;
        blockPane[0].style.transform = `translateX(${newWidth}px)`;
        width.current = newWidth;
        if (Math.abs(newWidth) >= scrollWidth - windowPane) {
          nextStep.current.style.display = 'none';
        } else {
          previousStep.current.style.display = 'block';
        }
      }
    });

    previousStep.current?.addEventListener('click', (e) => {
      e.preventDefault();
      if (scrollWidth + windowPane > width.current && width.current !== 0) {
        width.current = width.current + windowPane;
        blockPane[0].style.transform = `translateX(${width.current}px)`;
      } else {
        width.current = 0;
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

          <CarouselButton ref={nextStep} iconValue={'➡️'} />
          <CarouselButton ref={previousStep} iconValue={'⬅️'} />
        </>
      )}

      {albums.length > 0 && (
        <>
          <ul className='slider__wrapper' ref={block_pane}>
            <div className='block__pane' data-carousel={`carousel-${slugName}`}>
              {albums.map((item) => (
                <div key={item.id}>
                  <GeneralAlbum album={item} slugName={slugName} />
                </div>
              ))}
            </div>
          </ul>

          <CarouselButton ref={nextStep} iconValue={'➡️'} />
          <CarouselButton ref={previousStep} iconValue={'⬅️'} />
        </>
      )}
    </>
  );
};

export default Carousel;

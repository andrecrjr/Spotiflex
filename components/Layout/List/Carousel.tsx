import React, { useRef, useCallback, useLayoutEffect, forwardRef } from 'react';
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

    nextStep.current?.addEventListener('click', (e) => {
      e.preventDefault();
      if (scrollWidth - windowPane >= Math.abs(width.current)) {
        const newWidth = width.current - windowPane;
        blockPane[0].style.transform = `translateX(${newWidth}px)`;
        width.current = newWidth;
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

  // e.preventDefault();
  // console.log(block_pane.current?.scrollWidth);
  // console.log(block_pane.current?.clientWidth);
  // const scrollWidth = document.querySelector(
  //   `.block__pane[data-carousel=carousel-${slugName}]`
  // ).scrollWidth;
  // const windowPane = document.querySelector(
  //   `.block__pane[data-carousel=carousel-${slugName}]`
  // ).clientWidth;
  // e.preventDefault();
  // if (scrollWidth + windowPane > width && width !== 0) {
  //   setWidth((oldData) => oldData + windowPane);
  // } else {
  //   setWidth(0);
  // }

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
          {/* <CarouselButton fn={previousStep} iconValue={'⬅️'} /> */}
        </>
      )}
    </>
  );
};

export default Carousel;

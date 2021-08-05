import React, { useRef, useLayoutEffect } from 'react';
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

    const blockPane = divCarousel?.children as HTMLCollectionOf<HTMLElement>;

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
          previousStep.current.style.display = 'block';
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
        console.log(Math.abs(width.current));
        console.log(scrollWidth + windowPane);
        if (Math.abs(width.current) > 0) {
          nextStep.current.style.display = 'block';
        } else {
          previousStep.current.style.display = 'none';
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

          <CarouselButton ref={nextStep} controlSide={'next'}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon'
              viewBox='0 0 32 32'
            >
              <path d='M28 14H8.8l4.62-4.62c.4-.4.58-.86.58-1.38 0-.98-.81-2-2-2-.53 0-1 .2-1.38.58l-7.96 7.96c-.33.33-.66.73-.66 1.46s.28 1.08.65 1.45l7.97 7.97c.39.39.85.58 1.38.58 1.19 0 2-1.02 2-2 0-.52-.19-.99-.58-1.38L8.8 18H28a2 2 0 000-4z' />
            </svg>
          </CarouselButton>
          <CarouselButton ref={previousStep} controlSide={'previous'}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon'
              viewBox='0 0 32 32'
            >
              <path d='M28 14H8.8l4.62-4.62c.4-.4.58-.86.58-1.38 0-.98-.81-2-2-2-.53 0-1 .2-1.38.58l-7.96 7.96c-.33.33-.66.73-.66 1.46s.28 1.08.65 1.45l7.97 7.97c.39.39.85.58 1.38.58 1.19 0 2-1.02 2-2 0-.52-.19-.99-.58-1.38L8.8 18H28a2 2 0 000-4z' />
            </svg>
          </CarouselButton>
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

          <CarouselButton ref={nextStep} controlSide={'next'}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon'
              viewBox='0 0 32 32'
            >
              <path d='M28 14H8.8l4.62-4.62c.4-.4.58-.86.58-1.38 0-.98-.81-2-2-2-.53 0-1 .2-1.38.58l-7.96 7.96c-.33.33-.66.73-.66 1.46s.28 1.08.65 1.45l7.97 7.97c.39.39.85.58 1.38.58 1.19 0 2-1.02 2-2 0-.52-.19-.99-.58-1.38L8.8 18H28a2 2 0 000-4z' />
            </svg>
          </CarouselButton>
          <CarouselButton ref={previousStep} controlSide={'previous'}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon'
              viewBox='0 0 32 32'
            >
              <path d='M28 14H8.8l4.62-4.62c.4-.4.58-.86.58-1.38 0-.98-.81-2-2-2-.53 0-1 .2-1.38.58l-7.96 7.96c-.33.33-.66.73-.66 1.46s.28 1.08.65 1.45l7.97 7.97c.39.39.85.58 1.38.58 1.19 0 2-1.02 2-2 0-.52-.19-.99-.58-1.38L8.8 18H28a2 2 0 000-4z' />
            </svg>
          </CarouselButton>
        </>
      )}
    </>
  );
};

export default Carousel;

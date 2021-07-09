import React, { useState } from 'react';
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
  const [width, setWidth] = useState<number>(0);

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    const scrollWidth = document.querySelector(
      `.block__pane[data-carousel=carousel-${slugName}]`
    ).scrollWidth;
    const windowPane = document.querySelector(
      `.block__pane[data-carousel=carousel-${slugName}]`
    ).clientWidth;
    if (scrollWidth - windowPane >= Math.abs(width)) {
      setWidth((oldWidth) => oldWidth - windowPane);
    }
  };

  const previousStep = (e: React.MouseEvent) => {
    const scrollWidth = document.querySelector(
      `.block__pane[data-carousel=carousel-${slugName}]`
    ).scrollWidth;
    const windowPane = document.querySelector(
      `.block__pane[data-carousel=carousel-${slugName}]`
    ).clientWidth;
    e.preventDefault();

    if (scrollWidth + windowPane > width && width !== 0) {
      setWidth((oldData) => oldData + windowPane);
    } else {
      setWidth(0);
    }
  };

  return (
    <>
      <style global jsx>{`
        .block__pane[data-carousel=carousel-${slugName}] .block__pane--space {
          transform: translateX(${`${width}px`});
          transition: transform 100ms linear;
        }
      `}</style>
      {playlists.length > 0 && (
        <>
          <ul className='slider__wrapper'>
            <div className='block__pane' data-carousel={`carousel-${slugName}`}>
              {iconsWithTitle &&
                playlists &&
                playlists?.map((item, index) => (
                  <GeneralPlaylist key={index} album={item} />
                ))}
            </div>
          </ul>
          <CarouselButton fn={nextStep} iconValue={'➡️'} />
          <CarouselButton fn={previousStep} iconValue={'⬅️'} />
        </>
      )}

      {albums.length > 0 && (
        <>
          <ul className='slider__wrapper'>
            <div className='block__pane' data-carousel={`carousel-${slugName}`}>
              {albums.map((item) => (
                <div key={item.id}>
                  <GeneralAlbum album={item} slugName={slugName} />
                </div>
              ))}
            </div>
          </ul>

          <CarouselButton fn={nextStep} iconValue={'➡️'} />
          <CarouselButton fn={previousStep} iconValue={'⬅️'} />
        </>
      )}
    </>
  );
};

export default Carousel;

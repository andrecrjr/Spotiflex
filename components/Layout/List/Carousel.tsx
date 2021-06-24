import React, { useState } from "react";
import { PlaylistItems, ISpotifyAlbum } from "../../../types";
import { GeneralPlaylist } from "./Playlist";
import Image from "next/dist/client/image";

const Carousel: React.FC<{
  listType: { playlists?: PlaylistItems[]; album?: ISpotifyAlbum[] };
  name: string;
  iconsWithTitle: boolean;
}> = ({ listType: { playlists = [], album = [] }, name, iconsWithTitle }) => {
  const [width, setWidth] = useState<number>(0);

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    let scrollWidth = document.querySelector(".block__pane").scrollWidth;
    let windowPane = document.querySelector(".block__pane").clientWidth;
    if (scrollWidth - windowPane >= Math.abs(width)) {
      setWidth((oldWidth) => oldWidth - windowPane);
    }
  };

  const previousStep = (e: React.MouseEvent) => {
    let scrollWidth = document.querySelector(".block__pane").scrollWidth;
    let windowPane = document.querySelector(".block__pane").clientWidth;
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
        .block__pane--space {
          transform: translateX(${`${width}px`});
          transition: transform 100ms linear;
        }
      `}</style>
      {playlists.length > 0 && (
        <>
          <ul className='slider__wrapper'>
            <div className='block__pane'>
              {iconsWithTitle &&
                playlists &&
                playlists?.map((item) => <GeneralPlaylist album={item} />)}
            </div>
          </ul>

          <button onClick={nextStep}>➡️</button>
          <button onClick={previousStep}>⬅️</button>
        </>
      )}

      {album.length > 0 && (
        <>
          <ul className='slider__wrapper'>
            <div className='block__pane'>
              {iconsWithTitle &&
                album &&
                album?.map((item) => <p>{item.artists}</p>)}
            </div>
          </ul>

          <button onClick={nextStep}>➡️</button>
          <button onClick={previousStep}>⬅️</button>
        </>
      )}
    </>
  );
};

export default Carousel;

import React from 'react';
import Link from 'next/link';
import { MdExplore, MdMusicNote, MdMic } from 'react-icons/md';

function Menu(): JSX.Element {
  return (
    <nav className='header__menu'>
      <ul className='header__menu--wrapper'>
        <li className='header__menu--item'>
          <Link href='/explorer'>
            <a className='menu--item'>
              <span className='menu--icon'>
                <MdExplore color='rgb(148, 230, 26)' />
              </span>
              <span className='menu--option'>Explore</span>
            </a>
          </Link>
        </li>
        <li className='header__menu--item'>
          <Link href='#'>
            <a className='menu--item' style={{ color: '#161616' }}>
              <MdMusicNote title='musics' color='#161616' />
              <span className='menu--option'>Songs</span>
            </a>
          </Link>
        </li>
        <li className='header__menu--item'>
          <Link href='#'>
            <a className='menu--item' style={{ color: '#161616' }}>
              <span className='menu--icon'>
                <MdMic title='podcast' color='#161616' />
              </span>
              <span className='menu--option'>Podcast</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;

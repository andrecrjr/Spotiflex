import React from 'react';
import Link from 'next/link';

function Menu(): JSX.Element {
  const openMenu = () => {
    document.querySelector('.main--grid').classList.toggle('open--menu');
    document.querySelector('.menu').classList.toggle('opened');
  };
  return (
    <header className='header'>
      <div className='menu' onClick={openMenu}>
        <svg viewBox='0 0 100 80' width='30' height='30' fill='#94e61a'>
          <rect width='100' height='20' rx='8'></rect>
          <rect y='30' width='100' height='20' rx='8'></rect>
          <rect y='60' width='100' height='20' rx='8'></rect>
        </svg>
      </div>
      <div className='logo'>
        <Link href='/'>Spotiflex</Link>
      </div>
      <nav className='header__menu'>
        <ul className='header__menu--wrapper'>
          <li>Home</li>
          <li>Playlists</li>
          <li>Albums</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;

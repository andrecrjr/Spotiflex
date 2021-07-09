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
        Menu
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

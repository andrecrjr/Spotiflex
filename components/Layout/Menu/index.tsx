import React from 'react';
import Link from 'next/link';

function Menu(): JSX.Element {
  const openMenu = () => {
    document.querySelector('.main--grid').classList.toggle('open--menu');
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
          <li className='header__menu--item'>
            <Link href='#'>
              <a className='menu--item'>
                <span className='menu--icon'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path d='M21.8 6.78l-8.12-5.29a3.1 3.1 0 00-3.36 0L2.2 6.78A2.46 2.46 0 001 8.84V23h9v-5.57h4V23h9V8.84a2.46 2.46 0 00-1.2-2.06zM21 21h-5v-5.57H8V21H3V8.84a.49.49 0 01.26-.39l8.12-5.29a1.14 1.14 0 011.18 0l8.12 5.29a.49.49 0 01.26.39z' />
                  </svg>
                </span>
                <span className='menu--option'>Home</span>
              </a>
            </Link>
          </li>
          <li className='header__menu--item'>
            <Link href='#'>
              <a className='menu--item'>
                <span className='menu--icon'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                    <path d='M28.6 3.2c-.2-.2-.5-.2-.8-.2l-16 3c-.5.1-.8.5-.8 1v14.8c-.8-.5-1.9-.8-3-.8-2.8 0-5 1.8-5 4s2.2 4 5 4 5-1.8 5-4V7.8l14-2.6v13.6c-.8-.5-1.9-.8-3-.8-2.8 0-5 1.8-5 4s2.2 4 5 4 5-1.8 5-4V4c0-.3-.1-.6-.4-.8z' />
                  </svg>
                </span>
                <span className='menu--option'>Musica</span>
              </a>
            </Link>
          </li>
          <li className='header__menu--item'>
            <Link href='#'>
              <a href='' className='menu--item'>
                <span className='menu--option'>Podcast</span>
              </a>
            </Link>
          </li>
          <Link href='#'>
            <a href='' className='menu--item'>
              <span className='menu--option'>Favoritos</span>
            </a>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;

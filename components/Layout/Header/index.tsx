import React from 'react';
import Link from 'next/link';

import Menu from './Menu';

function Header({ hasMenu }): JSX.Element {
  const openMenu = () => {
    document.querySelector('.main--grid').classList.toggle('open--menu');
  };
  return (
    <header className='header' style={{ width: !hasMenu && '0px' }}>
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
      <Menu />
    </header>
  );
}

export default Header;

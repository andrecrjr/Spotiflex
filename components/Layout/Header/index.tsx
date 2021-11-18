import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from './Menu';
import { SearchInput } from './SearchInput';

const Header: React.FC = () => {
  const router = useRouter();

  const openMenu = () => {
    document.querySelector('.main--grid').classList.toggle('open--menu');
  };
  const changeMenuRoute = () => {
    return (
      router.asPath.includes('album') ||
      router.asPath.includes('playlist') ||
      router.asPath.includes('genre') ||
      router.asPath.includes('artist')
    );
  };

  return (
    <>
      {changeMenuRoute() ? (
        <span
          style={{
            color: 'white',
            position: 'absolute',
            left: '15px',
            top: '15px',
          }}
          onClick={openMenu}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            style={{
              fill: '#14d143',
              width: '30px',
              position: 'absolute',
              transform: 'rotate(89deg)',
            }}
          >
            <path d='M256 0C114.618 0 0 114.618 0 256s114.618 256 256 256 256-114.618 256-256S397.382 0 256 0zm0 469.333c-117.818 0-213.333-95.515-213.333-213.333S138.182 42.667 256 42.667 469.333 138.182 469.333 256 373.818 469.333 256 469.333z' />
            <path d='M347.582 198.248L256 289.83l-91.582-91.582c-8.331-8.331-21.839-8.331-30.17 0-8.331 8.331-8.331 21.839 0 30.17l106.667 106.667c8.331 8.331 21.839 8.331 30.17 0l106.667-106.667c8.331-8.331 8.331-21.839 0-30.17-8.332-8.331-21.839-8.331-30.17 0z' />
          </svg>
        </span>
      ) : null}
      <header className={`header ${changeMenuRoute() ? 'subpage' : ''}`}>
        <div className='menu' onClick={openMenu}>
          {!changeMenuRoute() && (
            <svg viewBox='0 0 100 80' width='30' height='30' fill='#94e61a'>
              <rect width='100' height='20' rx='8'></rect>
              <rect y='30' width='100' height='20' rx='8'></rect>
              <rect y='60' width='100' height='20' rx='8'></rect>
            </svg>
          )}
        </div>
        <div className='logo'>
          <SearchInput />
          <Link href='/'>Spotiflex</Link>
        </div>
        <Menu />
      </header>
    </>
  );
};

export default Header;

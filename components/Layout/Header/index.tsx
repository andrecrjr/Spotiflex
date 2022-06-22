import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from './Menu';
import { SearchInput } from './SearchInput';

const Header: React.FC = () => {
  const router = useRouter();

  const changeMenuRoute = () => {
    return (
      router?.asPath.includes('album') ||
      router?.asPath.includes('playlist') ||
      router?.asPath.includes('genre') ||
      router?.asPath.includes('artist')
    );
  };

  return (
    <>
      <header className={`header ${changeMenuRoute() ? 'subpage' : ''}`}>
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

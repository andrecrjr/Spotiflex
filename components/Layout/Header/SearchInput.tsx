import router from 'next/router';
import React from 'react';

import debounce from 'lodash.debounce';

export const SearchInput: React.FC = () => {
  const redirectSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/search/${e.target.value}`);
  };
  return (
    <>
      <span className='menu--icon'>🔍</span>

      <form
        className='menu--option search--box'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type='text'
          placeholder='Search your favorite band, song, whatever'
          onChange={debounce(redirectSearch, 500)}
        />
      </form>
    </>
  );
};

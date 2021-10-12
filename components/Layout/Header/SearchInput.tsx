import router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import debounce from 'lodash.debounce';

export const SearchInput: React.FC = () => {
  const [searchMode, setSearchMode] = useState(false);
  const redirectSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/search/${e.target.value}`);
  };
  return (
    <>
      <span className='menu--icon'>🔍</span>

      <form className='menu--option search--box'>
        <input
          type='text'
          placeholder='Search your favorite band, song, whatever'
          onChange={debounce(redirectSearch, 600)}
        />
      </form>
    </>
  );
};

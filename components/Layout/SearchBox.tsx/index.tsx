import React, { useCallback } from 'react';
import { spotifyAuth } from '../../../helper';

export const SearchBox = ({ query }: { query: '' }) => {
  useCallback(async () => {
    const { access_token } = await spotifyAuth();
  }, []);
  return <div></div>;
};

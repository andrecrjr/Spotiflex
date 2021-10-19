import { TokenSpotify } from './types';

export const getPublicAuth = async (client = false): Promise<TokenSpotify> => {
  try {
    let data = await spotifyAuth();
    const publicAuth: TokenSpotify = data;
    return publicAuth;
  } catch (error) {
    console.log(error);
    return {
      access_token: '',
      token_type: '',
      expires_in: 0,
      scope: '',
    };
  }
};

export const spotifyAuth = async (): Promise<TokenSpotify> => {
  const body = 'grant_type=client_credentials';
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Basic ${Buffer.from(
        `09cc6d07722546fdbb6f06e4e9161f90:${process.env.SPOTIFY_SECRET_KEY}`
      ).toString('base64')}`,
    },
    body: body,
  });
  const data = await response.json();
  return data;
};

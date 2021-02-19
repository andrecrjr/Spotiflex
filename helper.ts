import { TokenSpotify } from "./types";

export const getPublicAuth = async (url: string): Promise<TokenSpotify> => {
  try {
    let urlAuth = `http://${url}/api/spotifyAuth`;
    const data = await fetch(urlAuth);
    const publicAuth: TokenSpotify = await data.json();
    return publicAuth;
  } catch (error) {
    return {
      access_token: "",
      token_type: "",
      expires_in: 0,
      scope: "",
    };
  }
};

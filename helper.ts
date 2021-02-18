import { TokenSpotify } from "./types";

export const getPublicAuth = async (): Promise<TokenSpotify> => {
  try {
    let urlAuth = `${process.env.SERVER_URL}api/spotifyAuth`;
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

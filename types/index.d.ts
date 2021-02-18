export interface TokenSpotify {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface PropsHome {
  items: {
    name: "";
    image: {};
    href: "";
    id: "";
    icons: [
      {
        url: "";
        height: number;
        width: number;
      }
    ];
  }[];
}

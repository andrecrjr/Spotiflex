module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: [
      't.scdn.co',
      'i.scdn.co',
      'charts-images.scdn.co',
      'thisis-images.scdn.co',
    ],
  },
  serverRuntimeConfig: {
    spotifySecretKey: process.env.SPOTIFY_SECRET_KEY,
  },
};

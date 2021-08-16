export const spotifyAuth = async (): Promise<void> => {
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

export function msToTime(duration: number): string {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  const newMinutes = minutes < 10 ? '0' + minutes : minutes;
  const newSeconds = seconds < 10 ? '0' + seconds : seconds;

  return newMinutes + ':' + newSeconds;
}

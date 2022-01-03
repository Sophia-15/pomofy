import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'user-read-currently-playing',
  ' user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
].join(',');
const params = {
  scope: scopes,
};

const paramString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${paramString.toString()}`;

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export { LOGIN_URL, spotifyAPI };

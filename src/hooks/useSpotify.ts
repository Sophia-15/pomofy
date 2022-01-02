import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { spotifyAPI } from '../services/spotify';

export function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn('spotify');
      }

      spotifyAPI.setAccessToken(session.accessToken);
    }
  }, [session]);

  return spotifyAPI;
}

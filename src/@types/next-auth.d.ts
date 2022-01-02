import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    accessTokenExpires: any;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string | undefined | any;
  }
}

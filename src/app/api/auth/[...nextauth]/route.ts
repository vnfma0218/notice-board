import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async session({
  //     session,
  //     token,
  //     user,
  //   }: {
  //     session: any;
  //     token: any;
  //     user: any;
  //   }) {
  //     console.log('session', session);
  //     return session;
  //   },
  // },

  //   pages: {
  //     siginIn: '/signin',
  //   },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

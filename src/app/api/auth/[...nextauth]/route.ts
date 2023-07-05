import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/api/login';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        if (!credentials) return;
        const res = await login({
          email: credentials!.email,
          password: credentials!.password,
        });
        const user = res.user;

        if (res && user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ baseUrl, url }: any) {
      if (url === '/login') {
        return url;
      }
      return baseUrl;
    },
  },

  //   pages: {
  //     siginIn: '/signin',
  //   },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

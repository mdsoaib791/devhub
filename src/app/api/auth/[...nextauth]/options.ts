import axios from 'axios';
import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

type ExtendedUser = User & { id: string };
type ExtendedToken = JWT & { id?: string };

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await axios.get(`${API_BASE}/users?email=${credentials.email}`);
        const user = res.data[0];

        if (user && user.password === credentials.password) {
          return { id: user.id, email: user.email, name: user.name } as ExtendedUser;
        }

        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      const extendedUser = user as ExtendedUser;

      if (user) {
        token.id = extendedUser.id;
        token.email = extendedUser.email;
        token.name = extendedUser.name;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const extendedToken = token as ExtendedToken;

      session.user = {
        id: extendedToken.id ?? '',
        email: extendedToken.email ?? '',
        name: extendedToken.name ?? '',
      };

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

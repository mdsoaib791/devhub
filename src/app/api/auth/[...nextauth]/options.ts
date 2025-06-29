import axios from 'axios';
import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

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

        // Query the same json-server as /api/register
        const res = await axios.get(
          `${API_BASE}/users?email=${credentials.email}`
        );
        const user = res.data[0];
        if (user && user.password === credentials.password) {
          // Must return an object with at least an id
          return { id: user.id, email: user.email, name: user.name } as User;
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = (user as any).id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: (token as any).id,
        email: token.email,
        name: token.name,
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

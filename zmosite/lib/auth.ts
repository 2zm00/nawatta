import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { query } from './db'
import { compare } from 'bcrypt'
import { DefaultSession } from "next-auth"



interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  password: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        try {
          const users = await query<User[]>(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email]
          );
          const user = users[0];
          if (user && await compare(credentials.password, user.password)) {
            const { password: _password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        } catch (error) {
          console.error('Database query error:', error);
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}
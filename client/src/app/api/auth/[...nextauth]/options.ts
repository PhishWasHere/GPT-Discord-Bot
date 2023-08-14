import type { NextAuthOptions } from 'next-auth'
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";


const scopes = ['identify'].join(' ');

export const options: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: {params: {scope: scopes}}
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = { id: 1, name: 'user1', password: 'test' };
        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
}

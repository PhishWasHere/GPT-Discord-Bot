import NextAuth from 'next-auth';
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId:<string> process.env.CLIENT_ID,
      clientSecret:<string> process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        return { ...token, ...user }
    },
    async session({ session, token, user }) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
});

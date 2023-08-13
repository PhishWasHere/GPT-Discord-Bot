import type { NextAuthOptions } from 'next-auth'
import DiscordProvider from "next-auth/providers/discord";



export const options: NextAuthOptions = {
    providers: [
        DiscordProvider({
          clientId:<string> process.env.CLIENT_ID,
          clientSecret:<string> process.env.CLIENT_SECRET,
        }),
      ],
    //   pages: {  do once auth working
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //   },
    // add session later
    // async authorize(credentials: string) { //setup with mongoose
    //     const user = { id: 1, name: 'J Smith', email: '', image: '' }
    //     return user
    // },
    
}
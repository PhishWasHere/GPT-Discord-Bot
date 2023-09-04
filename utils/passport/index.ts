import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import Users from '../../models/users';

type Guild = {
  id: string;
  name: string;
  owner: boolean;
};

type GuildArray = Guild[];

const findUser = async (id: string, username: string, avatar?:string, guilds?: GuildArray) => {
  const userData = await Users.findOne({user_id: id});
  const userAvatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  if (!userData) {    
    Users.create({
      user_id: id,
      username,
      avatar: userAvatar,
    })
    if (guilds) {
      guilds.forEach(async (guild) => {
        if (guild.owner) {
          await Users.findOneAndUpdate({user_id: id}, {$push: {guilds: guild.id}});
        }
      });
    }     
  }

  if (guilds) {
    const uniqueGuildIds = new Set();

    guilds.forEach(async (guild) => {
      if (guild.owner && !uniqueGuildIds.has(guild.id)) {
        uniqueGuildIds.add(guild.id);
        await Users.findOneAndUpdate(
          { user_id: id },
          { $addToSet: { guilds: guild.id } } // Using $addToSet to prevent duplicates
        );
      }
    });
  }   

  return userData;
}

import { JwtUser } from '../types';

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  callbackURL:  process.env.CLIENT_REDIRECT || 'http://localhost:8080/api/v1/auth',
  scope: ['identify', 'guilds'],
  }, async (accessToken, refreshToken, profile, done) => { //setup refresh tokens
  const { id, username, discriminator, avatar, guilds } = profile;   
  
  const user:JwtUser = {id};
  await findUser(id, username, avatar!, guilds);
    
  return done(null, user, { id, username, discriminator, avatar, guilds });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user!);
});

export { passport };
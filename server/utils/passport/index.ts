import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import  Users from '../../models/users';
import Guilds from '../../models/guilds';

const findUser = async (id: string, username: string) => {
  const userData = Users.findOne({user_id: id});
  
  if (!userData) {    
    Users.create({
      user_id: id,
      username,
    })
  }
  return userData;
}

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  callbackURL: 'http://localhost:8080/api/v1/auth',
  scope: ['identify', 'guilds'],
  }, async (accessToken, refreshToken, profile, done) => {
  const { id, username, discriminator, avatar, guilds } = profile;   
    
  await findUser(id, username);

  return done(null, { id, username, discriminator, avatar, guilds });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user!);
});


export { passport };
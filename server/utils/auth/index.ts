import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import jwt, { JwtPayload } from 'jsonwebtoken';

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  callbackURL: 'http://localhost:8080/api/v1/auth',
  scope: ['identify', 'guilds'],
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user!);
});


export { passport };
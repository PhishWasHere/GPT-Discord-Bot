import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
// import { passport } from './utils/auth';
import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 8080;

import db from './config/mongo';
import {clientStart} from './discord';

import routes from './routes';
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

db.once('open', async () => {
  console.log(`\x1b[35m> Ready!\x1b[0m Connected to MongoDB`);
  try {
    const app = express() 
    app.use(session({ secret: process.env.SESSION!, 
      resave: false, saveUninitialized: false 
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(cookieParser())

    app.use(cors({origin: 'http://localhost:3000', credentials: true}))
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    
    app.get('/api/v1/auth',
      passport.authenticate('discord', { failureRedirect: '/login' }),
      (req: Request, res: Response) => {
        const token = jwt.sign(req.user!, process.env.JWT_SECRET!, { expiresIn: '3d' });
        res.cookie('token', token, { httpOnly: true });        
        res.redirect(`http://localhost:3000/`);
      }
    );
    
    app.use('/api/v1', routes);

    app.listen(port, () => {
      console.log(`\x1b[35m> Ready!\x1b[0m on http://localhost:${port}`);
    });

    // clientStart();
  } catch (err: any) {
    console.error(err.stack)
    process.exit(1)
  }
});


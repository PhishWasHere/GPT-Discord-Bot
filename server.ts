import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import {passport} from './utils/passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 8080;

import db from './config/mongo';
import {clientStart} from './discord';

import routes from './routes';

import {authToken} from './utils/jwt';
db.once('open', async () => {
  console.log(`\x1b[35m> Ready!\x1b[0m Connected to MongoDB`);
  try {
    const app = express() 

    app.use(cors({ origin: process.env.CLIENT_HOME, credentials: true }))

    app.use(session({ secret: process.env.SESSION!, 
      resave: false, saveUninitialized: false 
    }))

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(cookieParser())

    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    
    app.get('/api/v1/auth',
      passport.authenticate('discord', { failureRedirect: '/login' }),
      (req: Request, res: Response) => {
        const { id } = req.user as JwtPayload;
        const token = jwt.sign({user_id: id }, process.env.JWT_SECRET!, { expiresIn: '3d' });
        res.cookie('token', token, { httpOnly: false, domain: process.env.DOMAIN, secure: true });
        res.redirect(`${process.env.CLIENT_CALLBACK}?token=${token}`);
      }
    );
    
    app.use('/api/v1', authToken, routes);

    app.listen(port, () => {
      console.log(`\x1b[35m> Ready!\x1b[0m on http://localhost:${port}`);
    });

    clientStart();
  } catch (err: any) {
    console.error(err.stack)
    process.exit(1)
  }
});


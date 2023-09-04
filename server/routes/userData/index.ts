import express, {Request, Response} from 'express';
import  { JwtPayload } from 'jsonwebtoken';
import { Users, Guilds } from '../../models';

import * as userRoute from './users';
import * as guildRoute from './guilds';

const router = express.Router();

router.use('/users', userRoute.default);
router.use('/guilds', guildRoute.default);

router.get('/', async (req: Request, res: Response) => {
    // Check if the user is authenticated, and if so, send the user data    
  try {
    if(!req.user) {
      return res.status(401).send('Unauthorized: No token provided');
    }
    const id = (req.user as JwtPayload).id;

    const userData = await Users.findOne({user_id: id});
    
    if (!userData) {
      return res.status(200).send('No user found'); 
    }

    const {user_id, username, avatar, eula } = userData!;
    const userGuild = userData?.guilds;
      
    let guildData: any []= [];

    if (userGuild) {
      const guildPromise = userGuild.map(async (id) => {
        const guild = await Guilds.findOne({ guild_id: id });
        if (!guild) {
          return { guild_id: id, guild_name: null, icon: null };
        }
        return { guild_id: guild.guild_id, guild_name: guild.guild_name, icon: guild.icon, eula: guild.eula };
      });
      guildData = await Promise.all(guildPromise);
    }    
    
    res.status(200).json({ user_id, username, avatar, eula, guildData });
  } catch (err) {
    console.error('err', err);
  }
});

export default router;
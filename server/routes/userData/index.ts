import express, {Request, Response} from 'express';
import  { JwtPayload } from 'jsonwebtoken';
import { Users, Guilds } from '../../models';

const router = express.Router();

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

      const {user_id, username, avatar } = userData!;
      const userGuild = userData?.guilds;
       
      let guilds: any = [];
      if (userGuild) {
        const guildPromise = userGuild.map(async (id) => { // map the array to a promise
            await Guilds.findOne({ guild_id: id });
            return id;
      });
            guilds = await Promise.all(guildPromise); // wait for all the promises to resolve
      }
      
      res.status(200).json({ user_id, username, avatar, guilds });
    } catch (err) {
      console.error('err', err);
    }
});

// get all guilds from user
  //get token count
    // add token count to total
      // do same for used tokens

export default router;
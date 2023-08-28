import express, {Request} from 'express';
import  { JwtPayload } from 'jsonwebtoken';
import Users from  '../../models/users';
import Guilds from '../../models/guilds';

const router = express.Router();

router.get('/', async (req: Request, res) => {
    // Check if the user is authenticated, and if so, send the user data    
    try {
      if(!req.user) {
        return res.status(401).send('Unauthorized: No token provided');
      }
      const id = (req.user as JwtPayload).id;
  
      const userData = await Users.findOne({user_id: id});
      
      const {user_id, username, avatar } = userData!;
      const userGuild = userData?.guilds;
      
      if (!userData) {
        return res.status(200).send('No user found');
      }
       
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

export default router;
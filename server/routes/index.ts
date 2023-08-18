import express, {Request, Response} from 'express';
import  { JwtPayload } from 'jsonwebtoken';
import * as usage from './usage'
const router = express.Router();

router.use('/usage', usage.default);

router.get('/', (req, res) => {
  res.json({ message: 'API base route' });
});

import Users from  '../models/users';
router.get('/userdata', async (req: any, res) => {
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
    
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
  }
});

export default router;

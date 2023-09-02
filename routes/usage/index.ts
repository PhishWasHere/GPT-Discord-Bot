import express, {Request, Response} from 'express';
import { Users, Guilds } from '../../models/index';
import { UserDataType, GuildDataType } from '../../utils/types';
import mapGenerator from '../../utils/mapGenerator';
import  { JwtPayload } from 'jsonwebtoken';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    try {
        const id = (req.user as JwtPayload).id;

        const user: UserDataType | null = await Users.findOne({ user_id: id }).populate('content');

        if(!user) {
            return res.status(200).send('No user found');
        }

        const tokenArr = await mapGenerator(user.content);
        
        res.status(200).json({ credit: user.credit, tokenArr });
    } catch (error) {
        console.error('Error fetching and processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/guilds', async (req: Request, res: Response) => {
    try {        
        const id = req.headers.guild_id as string;        

        const guild: GuildDataType | null = await Guilds.findOne({ guild_id: id }).populate('content');

        if (!guild) {
            return res.status(200).send({ guild_name: 'No guild found' });
        }

        const tokenArr = await mapGenerator(guild.content);
        
        res.status(200).json({credit: guild.credit, guild_name: guild.guild_name, tokenArr });
    } catch (error) {
        console.error('Error fetching and processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});



export default router;
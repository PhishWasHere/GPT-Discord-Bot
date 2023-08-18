import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import User from '../../models/users';
import Guilds from '../../models/guilds';
const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const id = req.headers.user_id as string;        
        const userData = await User.aggregate([
            { $match: { user_id: id } },
            { $unwind: '$content' },
            {
                $project: {
                    _id: 0,
                    tokensArray: '$content.tokens'
                }
            }
        ]);

        const tokenData = userData[0].tokensArray;

        res.status(200).json(tokenData);
    } catch (error) {
        console.error('Error fetching and processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/guilds', async (req, res) => {
    try {
        const id = req.headers.user_id as string;        
        const guildData = await Guilds.aggregate([
            { $match: { owner_id: id } },
            { $unwind: '$content' },
            {
                $project: {
                    _id: 0,
                    guild_id: '$guild_id',
                    tokensArray: '$content.tokens'
                }
            }
        ]);        
        res.status(200).json(guildData);
    } catch (error) {
        console.error('Error fetching and processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
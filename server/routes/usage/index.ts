import express, {Request, Response} from 'express';
import User from '../../models/users';
import Guilds from '../../models/guilds';
const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const id = req.headers.user_id as string;        
        const userData = await User.aggregate([ //gets all tokens for a user
            { $match: { user_id: id } },
            { $unwind: '$content' },
            {
                $project: {
                    _id: 0,
                    tokensArray: '$content.tokens'
                }
            }
        ]);

        const tokenData = userData[0].tokensArray; //gets the tokens array from the returned object, instead of an array of objects

        res.status(200).json(tokenData);
    } catch (error) {
        console.error('Error fetching and processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/guilds', async (req, res) => {
    try {
        const id = req.headers.user_id as string;        
        const guildData = await Guilds.aggregate([ //gets all tokens for a guild, matched by owner_id
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
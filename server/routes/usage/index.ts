import express, {Request, Response} from 'express';
import User from '../../models/users';
import Guilds from '../../models/guilds';
import dayjs from 'dayjs';


const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const id = req.headers.user_id as string;

        const user = await User.findOne ({ user_id: id });

        if(!user) {
            return res.status(200).send('No user found');
        }
        const tokenMap = new Map();
        
        user!.content.forEach(content => {
            const date = dayjs(content.created_timestamp);
            const day = date.day();
            const dayName = date.format('dddd');
    
            const tokens = content.tokens;
            const totalTokens = tokens.reduce((acc, token) => acc + token.total, 0);
    
            if (tokenMap.has(day)) {
                const existingEntry = tokenMap.get(day);
                existingEntry.tokens[0].total += totalTokens;
                existingEntry.count += 1; 
            } else {
                tokenMap.set(day, { day, dayName, tokens: [{ total: totalTokens }], count: 1 });
            }
        });
        
        const tokenArr = [...tokenMap.values()];
        
        res.status(200).json( tokenArr );
    } catch (error) {
        console.error('Error fetching and processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/guilds', async (req, res) => {
    try {
        const id = req.headers.guild_id as string;        
        console.log(id);
        
        const guild = await Guilds.findOne ({ guild_id: id });

        if(!guild) {
            return res.status(200).send('No guild found');
        }

        const tokenMap = new Map();

        guild.content.forEach(content => {
            const date = dayjs(content.author[0].created_timestamp);
            const day = date.day();
            const dayName = date.format('dddd');
    
            const tokens = content.tokens;
            const totalTokens = tokens.reduce((acc, token) => acc + token.total, 0);
    
            if (tokenMap.has(day)) {
                const existingEntry = tokenMap.get(day);
                existingEntry.tokens[0].total += totalTokens;
                existingEntry.count += 1; 
            } else {
                tokenMap.set(day, { day, dayName, tokens: [{ total: totalTokens }], count: 1 });
            }
        });
    
        const tokenArr = [...tokenMap.values()];

        res.status(200).json(tokenArr);
    } catch (error) {
        console.error('Error fetching and processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
import express, {Request, Response} from 'express';
import { Guilds } from '../../../models';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {        
        const id = req.body.guild_id as string;        
        
        const guild = await Guilds.findOne({ guild_id: id })

        if (!guild) {
            return res.status(200).send('No guild found');
        }

        guild.eula = !guild.eula;
        await guild.save();

        res.status(200).send('Persistence toggled');

    } catch (err) {
        console.error(err);
    }
});

export default router;
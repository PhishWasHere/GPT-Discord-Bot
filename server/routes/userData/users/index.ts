import express, {Request, Response} from 'express';
import  { JwtPayload } from 'jsonwebtoken';
import { Users } from '../../../models';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const id = (req.user as JwtPayload).id;

        const userData = await Users.findOne({user_id: id});

        if (!userData) {
            return res.status(200).send('No user found');
        }

        userData.eula = !userData.eula;

        await userData.save();

        res.status(200).send('EULA accepted');

    } catch (err) {
        console.error(err);
    }
});

export default router;
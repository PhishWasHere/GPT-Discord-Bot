import { Content, Guild_Content } from '../../models';
import { Types } from 'mongoose';

export default async function itemCounter ({user_id, guild_id}  : 
    {user_id?: Types.ObjectId, guild_id?: Types.ObjectId}) {
    try {
        const maxCount = process.env.MAX_COUNT ? parseInt(process.env.MAX_COUNT) : 10;
        
        if (user_id) {
            const count = await Content.countDocuments({ user: user_id });
            if (count > maxCount) {
                const deleteCount = count - maxCount;
                await Content.deleteMany({ user: user_id }).limit(deleteCount);
            }
        }
        
        if (guild_id) {
            const count = await Guild_Content.countDocuments({ guild: guild_id });            
            if (count > maxCount) {
                const deleteCount = count - maxCount;
                await Guild_Content.deleteMany({ guild: guild_id }).limit(deleteCount);
            }
        }
    } catch (err) {
        console.error(`Server error: `, err);
    }
}
// function cannot remove more than 1 item, so cant lower maxCount without db reset
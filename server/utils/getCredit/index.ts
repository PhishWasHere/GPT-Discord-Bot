import { Guilds } from '../../models';
import { GuildDataType } from '../types';

export const getGuildCredit = async (guilds: string[]): Promise<{ guildCredit: number | undefined; usedGuildCredit: number | undefined }> => {
    try {
        let guildCredit;
        
        let usedGuildCredit = [];
        
        for (let i of guilds) {        
            const guildData: GuildDataType | null = await Guilds.findOne({ guild_id: i }).populate('content');
            guildCredit = guildData?.credit; // get the guild credit
            
            const token = guildData?.content.map((content) => { // get the used token count
                return content.tokens.map((token: any) => token.total);
            }).flat().reduce((acc: number, curr: number) => acc + curr, 0);
            
            usedGuildCredit.push(token);
        }

        usedGuildCredit = usedGuildCredit.reduce((acc, curr) => acc + curr, 0);

        return { guildCredit, usedGuildCredit };
    } catch (err) {
       console.error(err);
       return { guildCredit: undefined, usedGuildCredit: undefined};
    }
};

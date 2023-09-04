import { Guilds, Users } from '../../models';
import { GuildDataType, UserDataType } from '../types';

// function to get the total credit and total used credit

const getGuildCredit = async (guilds: string[]): Promise<{ guildCredit: number | undefined; usedGuildCredit: number | undefined }> => {
    try {
        let guildCredit;
        
        let usedGuildCredit = [];
        
        for (let i of guilds) {        
            const guildData: GuildDataType | null = await Guilds.findOne({ guild_id: i }).populate('content');
            guildCredit = guildData?.credit; // get the guild credit
            
            const token = guildData?.content.map((content) => { // get the used token count
                return content.tokens.map((token: any) => token.total);
            }).flat().reduce((acc: number, curr: number) => acc + curr, 0); // sum the used token count
            
            usedGuildCredit.push(token);
        }

        usedGuildCredit = usedGuildCredit.reduce((acc, curr) => acc + curr, 0); // sum the used token count

        return { guildCredit, usedGuildCredit };
    } catch (err) {
       console.error(err);
       return { guildCredit: undefined, usedGuildCredit: undefined};
    }
};

export const getCredit = async (id: string) => {
    try {
        const userData: UserDataType | null = await Users.findOne({ user_id: id }).populate('content');

        const credit = userData?.credit;
        const userGuild = userData?.guilds;

        let guilds: string [] = [];
        if (userGuild) {
            const guildPromise = userGuild.map(async (id: string) => { // map the array to a promise
                await Guilds.findOne({ guild_id: id });
                return id;
            });
            guilds = await Promise.all(guildPromise); // wait for all the promises to resolve
        } 
        
        const usedCredit = userData?.content.map((content: any) => { // get the used token count
            return content.tokens.map((token: any) => token.total);
        }).flat().reduce((acc: number, curr: number) => acc + curr, 0); // sum the used token count

        const {guildCredit, usedGuildCredit} = await getGuildCredit(guilds);

        const totalCredit = credit! + guildCredit!;
        const totalUsedCredit = usedCredit + usedGuildCredit!;

        return { totalCredit, totalUsedCredit };
    } catch (err) {
       console.error(err);
       return { totalCredit: undefined, totalUsedCredit: undefined};
    }
};
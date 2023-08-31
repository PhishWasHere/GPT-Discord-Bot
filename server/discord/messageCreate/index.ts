import { newGuild, existingGuild } from "./guilds";
import { newUser, existingUser } from "./directMessage";
import Users from "../../models/users";
import Guilds from "../../models/guilds";
import { Message } from "discord.js";

export const handleDm = async (msg: Message, msgContent: string) => {
    const userData = await Users.findOne({ user_id: msg.author.id }).populate('content');

    if (!userData) {
        const gptRes = await newUser(msg, msgContent);
        msg.reply(`Dev response: ${gptRes}`);
    } else {
        const gptRes = await existingUser(msg, msgContent, userData);
        msg.reply(`Dev response: ${gptRes}`);
    }
};

export const handleGuild = async (msg: Message, msgContent: string) => {
    const guildData = await Guilds.findOne({ guild_id: msg.guildId }).populate('content');
    
    if (msg.guildId !== '790841166357594133') {
        console.log('not the right guild');
        return
    }

    if (!guildData) {
        const gptRes = await newGuild(msg, msgContent);
        msg.reply(`Dev response: ${gptRes}`);
    } else {
        const gptRes = await existingGuild(msg, msgContent, guildData);
        msg.reply(`Dev response: ${gptRes}`);
    }
};
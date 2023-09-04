import { newGuild, existingGuild } from "./guilds";
import { newUser, existingUser } from "./directMessage";
import Users from "../../models/users";
import Guilds from "../../models/guilds";
import { Message } from "discord.js";

const error = (msg: Message) => {
    msg.reply(`internal server error.`);
};

export const handleDm = async (msg: Message, msgContent: string) => {
    const userData = await Users.findOne({ user_id: msg.author.id }).populate('content');

    if (!userData) {
        const gptRes = await newUser(msg, msgContent);        
        if (gptRes === undefined|| gptRes.content?.startsWith('!ypeError'))return error(msg);

        msg.reply(gptRes);
    } else {
        const gptRes = await existingUser(msg, msgContent, userData);
        if (gptRes === undefined || gptRes.content?.startsWith('!ypeError'))return error(msg);

        msg.reply(gptRes);
    }
};

export const handleGuild = async (msg: Message, msgContent: string) => {
    const guildData = await Guilds.findOne({ guild_id: msg.guildId }).populate('content');

    if (!guildData || guildData.eula === false) {
        const gptRes = await newGuild(msg, msgContent);
        if (gptRes === undefined|| gptRes.content?.startsWith('!ypeError'))return error(msg);

        msg.reply(gptRes);
    } else {
        const gptRes = await existingGuild(msg, msgContent, guildData);
        if (gptRes === undefined|| gptRes.content?.startsWith('!ypeError'))return error(msg);

        msg.reply(gptRes);
    }
};

import { chatCompletion } from "../../../config/gpt";
import { Guilds, Guild_Content } from "../../../models";
import { Message } from "discord.js";
import { GuildData } from "../../../utils/types";
import itemCounter from "../../../utils/itemCount";

export const newGuild = async (msg: Message, msgContent: string, save?: boolean) => {
    try {        
        const guildData = new Guilds ({
            owner_id: msg.guild?.ownerId,
            guild_id: msg.guildId,
            guild_name: msg.guild?.name,
            icon: msg.guild?.iconURL(),
        });

        const prompt = `${msg.author.globalName}: ${msgContent}}`

        await guildData.save(); // save guild to db

        const completion = await chatCompletion(prompt);
        const {prompt_tokens, completion_tokens, total_tokens} =  completion.data.usage;
        const gptRes = completion.data.choices[0].message.content;

        if (save === true) return gptRes; // if save is true, return gptRes without saving to db

        const contentData = await Guild_Content.create({
            guild: guildData._id,
            author: [
                {
                    user_id: msg.author.id,
                    username: msg.author.username,
                    global_name: msg.author.globalName,
                    message: msgContent,
                    message_id: msg.id,
                    created_timestamp: new Date(), // Use the appropriate date here
                },
            ],
            gpt_response: gptRes,
            tokens: [
                {
                    prompt: prompt_tokens,
                    completion: completion_tokens,
                    total: total_tokens,
                },
            ],
        });
            
        await Guilds.findOneAndUpdate(
            { guild_id: guildData.guild_id },
            {$addToSet: {content: contentData._id},
        });

        return gptRes;

    } catch (err) {
        console.error(err);
    }
};

export const existingGuild = async (msg: Message, msgContent: string, guildData: GuildData) => {
    try {
        const maxCount = process.env.MAX_COUNT ? parseInt(process.env.MAX_COUNT) : 10;

        const messages = guildData.content        
            .slice(Math.max(guildData.content.length - maxCount, 0))
            .map((message: any) => message.author[0].message);

        const user = guildData.content
            .slice(Math.max(guildData.content.length - maxCount, 0))
            .map((message: any) => message.author[0].global_name);

        const gpt_Responses = guildData.content
            .slice(Math.max(guildData.content.length - maxCount, 0))
            .map((message: any) => message.gpt_response);

        const userPrompts = messages.map((message, i) => { // create prompts array
            return {
                role: 'user',
                content: `${user[i]}: ${message}}`
            };
        });
    
            const responses = gpt_Responses.map((response) => {
            return {
                role: 'assistant',
                content: response
            };
        });

        const sendMsg = `${msg.author.globalName}: ${msgContent}` // create prompt to send to gpt

        const completion = await chatCompletion(sendMsg, userPrompts, responses);
        const {prompt_tokens, completion_tokens, total_tokens} =  completion.data.usage;
        const gptRes = completion.data.choices[0].message.content;

        const contentData = await Guild_Content.create({
            guild: guildData._id,
            author: [
                {
                    user_id: msg.author.id,
                    username: msg.author.username,
                    global_name: msg.author.globalName,
                    message: msgContent,
                    message_id: msg.id,
                    created_timestamp: new Date(), 
                }
            ],
            gpt_response: gptRes,
            tokens: [
                {
                    prompt: prompt_tokens,
                    completion: completion_tokens,
                    total: total_tokens,
                },
            ],
        });

        await Guilds.findOneAndUpdate( // if guild exists, update it
            {guild_id: msg.guildId}, 
            {$addToSet: {content: contentData._id},
        },
        {new: true});
        
        await itemCounter({guild_id: guildData._id});

        return gptRes;
    } catch (err) {
        console.error(err);
    }
};
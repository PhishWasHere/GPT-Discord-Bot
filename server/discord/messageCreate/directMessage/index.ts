import {chatCompletion} from '../../../config/gpt/';
import { Users, Content } from '../../../models/';
import { Message } from 'discord.js';
import { UserData } from '../../../utils/types';

export const newUser = async (msg: Message, msgContent: any) => {
    try {
        const userData = new Users({
            user_id: msg.author.id,
            username: msg.author.username,
            avatar: msg.author.avatarURL(),
        });

        await userData.save();

        const completion = await chatCompletion(msgContent);

        const { prompt_tokens, completion_tokens, total_tokens } = completion.data.usage;
        const gptRes = completion.data.choices[0].message.content;

        const contentData = await Content.create({
            user: userData._id,
            global_name: msg.author.username,
            message: msgContent,
            message_id: msg.author.id,
            created_timestamp: msg.createdTimestamp,
            gpt_response: gptRes,
            tokens: [
                {
                    prompt: prompt_tokens,
                    completion: completion_tokens,
                    total: total_tokens,
                },
            ],
        });

        await Users.findOneAndUpdate(
            { user_id: userData.user_id },
            {$addToSet: {content: contentData._id},
        });

        return gptRes;
    } catch (err) {
        console.error(`Server error: `, err);
    }
};

export const existingUser = async (msg: Message, msgContent: string, userData: UserData) => {
    try {
        const userData = await Users.findOne({ user_id: msg.author.id }).populate('content');

        if(!userData) {
            return msg.reply('No user found');
        }

        const messages = userData.content
        .slice(Math.max(userData.content.length - 7, 0))
        .map((message: any) => message.message); // gets last 10 messages from user
       
        const user = userData.content
            .map((message: any) => message.global_name); 
                
        const gpt_Responses = userData.content
            .slice(Math.max(userData.content.length - 7, 0))
            .map((message: any) => message.gpt_response);// get last 10 responses from user

        const prompts = messages.map((message) => { // create prompts array
            return {
                role: 'user',
                content: `${user}: ${message}`
            };
        });

        const responses = gpt_Responses.map((response) => {
            return {
                role: 'assistant',
                content: response
            };
        });        
        
        const completion = await chatCompletion(msgContent, prompts, responses);
        const {prompt_tokens, completion_tokens, total_tokens} =  completion.data.usage;
        const gptRes = completion.data.choices[0].message.content;

        const contentData = await Content.create({
            user: userData._id,
            global_name: msg.author.username,
            message: msgContent,
            message_id: msg.author.id,
            created_timestamp: msg.createdTimestamp,
            gpt_response: gptRes,
            tokens: [
                {
                    prompt: prompt_tokens,
                    completion: completion_tokens,
                    total: total_tokens,
                },
            ],
        });

        await Users.findOneAndUpdate(
            { user_id: userData.user_id },
            {$addToSet: {content: contentData._id},
        });
        
        return gptRes;

    } catch (err) {
        console.error(err);
    }
}

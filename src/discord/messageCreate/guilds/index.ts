import { chatCompletion } from "../../../config/gpt";
import Guilds from '../../../models/guilds/';
import { Message } from "../../../utils/interface";

export const newGuild = async (msg: any, msgContent: string) => {
    try {
        const guildData = new Guilds ({
            guild_id: msg.guildId,
        });

        const prompt = `${msg.author.globalName}: ${msgContent}}`

        await guildData.save(); // save guild to db

        const completion = await chatCompletion(prompt);
        const {prompt_tokens, completion_tokens, total_tokens} =  completion.data.usage;
        const gptRes = completion.data.choices[0].message.content;

        await Guilds.findOneAndUpdate( // if guild exists, update it
            {guild_id: msg.guildId}, 
                {$push: {content: {
                    author:
                        [
                            {
                                user_id: msg.author.id,
                                username: msg.author.username,
                                global_name: msg.author.globalName,
                                message: msgContent,
                                message_id: msg.id, 
                                created_timestamp: msg.createdTimestamp,
                            },
                        ],
                    gpt_response: gptRes,
                    tokens: [ 
                        {          
                            prompt: prompt_tokens,
                            completion: completion_tokens,
                            total: total_tokens,
                        }       
                    ]
                }
            }
        });

        return gptRes;

    } catch (err) {
        console.error(err);
    }
};

export const existingGuild = async (msg: any, msgContent: string, guildData: any) => {
    try {
        const messages = guildData.content
            .slice(Math.max(guildData.content.length - 7, 0))
            .map((message: any) => message.author[0].message);

        const user = guildData.content
            .slice(Math.max(guildData.content.length - 7, 0))
            .map((message: any) => message.author[0].global_name);

        const gpt_Responses = guildData.content
            .slice(Math.max(guildData.content.length - 7, 0))
            .map((message: any) => message.gpt_response);

        const userPrompts = messages.map((message: any, i: any) => { // create prompts array
            return {
                role: 'user',
                content: `${user[i]}: ${message}}`
            };
        });
    
            const responses = gpt_Responses.map((response: any) => {
            return {
                role: 'assistant',
                content: response
            };
        });

        const sendMsg = `${msg.author.globalName}: ${msgContent}` // create prompt to send to gpt

        const completion = await chatCompletion(sendMsg, userPrompts, responses);
        const {prompt_tokens, completion_tokens, total_tokens} =  completion.data.usage;
        const gptRes = completion.data.choices[0].message.content;

        await Guilds.findOneAndUpdate( // if guild exists, update it
            {guild_id: msg.guildId}, 
            {$push: {content: {
            author:
                [
                {
                    user_id: msg.author.id,
                    username: msg.author.username,
                    global_name: msg.author.globalName,
                    message: msgContent,
                    message_id: msg.id, 
                    created_timestamp: msg.createdTimestamp,
                },
                ],
                gpt_response: gptRes,
                tokens: [ 
                {
                    prompt: prompt_tokens,
                    completion: completion_tokens,
                    total: total_tokens,
                }
            ]
            }
            }
        },
        {new: true});
        
        return gptRes;
    } catch (err) {
        console.error(err);
    }
};
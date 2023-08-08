import { chatCompletion } from "../../../config/gpt";
import Guilds from '../../../models/guilds/';

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


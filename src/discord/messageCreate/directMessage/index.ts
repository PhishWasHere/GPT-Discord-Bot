import {chatCompletion} from '../../../config/gpt/';
import User from '../../../models/users/';
import { ExistingUserFunction } from '../../../utils/interface';

export const newUser = async (msg: any, msgContent: string) => { //change any to acept Message type when i get that working
    try {
        const userData = new User ({
            user_id: msg.author.id,
            username: msg.author.username,
        });

        await userData.save();

        const completion = await chatCompletion(msgContent);

        const {prompt_tokens, completion_tokens, total_tokens} =  completion.data.usage;
        const gptRes = completion.data.choices[0].message.content;        
        
        const updatedData = await User.findOneAndUpdate(
        {user_id: msg.author.id},
        {$push: {content: {
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
                }
            ]
        }}
        },
            {new: true}
        );
                
        return gptRes;

    } catch (err) {
        console.error(`Server error: `, err);
    }
};

export const existingUser: ExistingUserFunction = async (msg, msgContent, userData) => {
    try {
        const messages = userData.content.slice(0, 7).map((message) => message.message); // gets last 10 messages from user
        const user = userData.global_name; // get last 10 users from user

        const gpt_Responses = userData.content.slice(0, 7).map((message) => message.gpt_response); // get last 10 responses from user

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

        await User.findOneAndUpdate(
            {user_id: msg.author.id, username: msg.author.username, global_name: msg.author.username},
            {$push: {content: {
                message: msgContent,
                message_id: msg.author.id,
                created_timestamp: msg.createdTimestamp,
                gpt_response: gptRes,
                tokens: [ 
                    {
                        prompt: prompt_tokens,
                        completion: completion_tokens,
                        total: total_tokens,
                    }
                ]
            }}
            },
            {new: true}
        );

        return gptRes;

    } catch (err) {
        console.error(err);
    }
}

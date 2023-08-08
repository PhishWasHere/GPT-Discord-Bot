import {chatCompletion} from '../../../config/gpt/';
import User from '../../../models/users/';


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

        await User.findOneAndUpdate(
        {user_id: msg.author.id, username: msg.author.username, global_name: msg.author.username},
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
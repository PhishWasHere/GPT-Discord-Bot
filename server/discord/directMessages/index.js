const { chatCompletion } = require('../../config/gpt');
const { User } = require('../../models');

module.exports = {
    newUser: async (msg, msgDm) => {
        try {
            newUser = new User ({
                user_id: msg.author.id,
            });
    
            await newUser.save();
            
            await chatCompletion(msgDm).then((completion) => res = completion);
            console.log(res);
            const gptRes = res.content;
    
            await User.findOneAndUpdate(
            {user_id: msg.author.id}, 
            {$push: {content: {
                author: [
                {
                    user_id: msg.author.id,
                    username: msg.author.username,
                    global_name: msg.author.globalName,
                    message: msgDm,
                    message_id: msg.id,
                    created_timestamp: msg.createdTimestamp,
                }
                ],
                gpt_response: gptRes
            }}
            },
                {new: true}
            );

            return gptRes;

        } catch (err) {
            console.error(`Server error: `, err);
        }
    },
}
 
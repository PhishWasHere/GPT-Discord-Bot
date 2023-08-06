const { chatCompletion } = require('../../config/gpt');
const { User } = require('../../models');

module.exports = {
    newUser: async (msg, msgDm) => {
        try {
            newUser = new User ({
                user_id: msg.author.id,
                username: msg.author.username,
                global_name: msg.author.username,
            });
    
            await newUser.save();
            
            await chatCompletion(msgDm).then((completion) => res = completion);

            const gptRes = res.content;

            await User.findOneAndUpdate(
            {user_id: msg.author.id, username: msg.author.username, global_name: msg.author.username},
            {$push: {content: {
                message: [
                    {
                        message: msg.author.content,
                        message_id: msg.author.id,
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

    existingUser: async (msg, msgDm) => {
        try {
            const mesages = user.content.slice(0,10).map((message) => message.author[0].message); // gets last 10 messages from user
            const userData = user.content.slice(0,10).map((message) => message.author[0].global_name); // get last 10 users from user
            console.log(messages, userData);
        } catch (err) {
            console.error(err);
        }
    }
}
 
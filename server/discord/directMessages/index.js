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
                message: msgDm,
                message_id: msg.author.id,
                created_timestamp: msg.createdTimestamp,
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

    existingUser: async (msg, msgDm, userData) => {
        try {
            const messages = userData.content.slice(0,10).map((message) => message.message); // gets last 10 messages from user
            const user = userData.global_name; // get last 10 users from user

            const prompts = messages.map((message, i) => { // create prompts array
                return {
                    user: user,
                    message: message
                };
            });

            await chatCompletion(msgDm, prompts).then((completion) => res = completion);
            const gptRes = res.content;

            await User.findOneAndUpdate(
                {user_id: msg.author.id, username: msg.author.username, global_name: msg.author.username},
                {$push: {content: {
                    message: msgDm,
                    message_id: msg.author.id,
                    created_timestamp: msg.createdTimestamp,
                    gpt_response: gptRes
                }}
                },
                {new: true}
            );

            return gptRes;

        } catch (err) {
            console.error(err);
        }
    }
}
 
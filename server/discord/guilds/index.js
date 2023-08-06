const { chatCompletion } = require('../../config/gpt');
const { Guild } = require('../../models');

module.exports = {
    newGuild: async (msg, msgClipped) => {
        try {
          guildData = new Guild ({
              guild_id: msg.guildId,
          });

          await guildData.save(); // save guild to db
          await chatCompletion(msgClipped).then((completion) => res = completion);
          const gptRes = res.content;

          await Guild.findOneAndUpdate( // if guild exists, update it
              {guild_id: msg.guildId}, 
              {$push: {content: {
                  author:
                      [
                          {
                          user_id: msg.author.id,
                          username: msg.author.username,
                          global_name: msg.author.globalName,
                          message: msgClipped,
                          message_id: msg.id, 
                          created_timestamp: msg.createdTimestamp,
                          },
                      ],
                  gpt_response: gptRes
              }}
              },
              {new: true}
          );

          return gptRes;
            
        } catch (err) {
          console.error(err);
        }
    },
      
    existingGuild: async (msg, msgClipped, guildData) => {
        try {
          const messages = guildData.content.slice(0,10).map((message) => message.author[0].message); // gets last 10 messages from guild
          const user = guildData.content.slice(0,10).map((message) => message.author[0].global_name); // get last 10 users from guild 
          
          const prompts = messages.map((message, i) => { // create prompts array
            return {
              user: user[i],
              message: message
            };
          });
    
          await chatCompletion(msgClipped, prompts).then((completion) => res = completion);
          const gptRes = res.content;
    
          await Guild.findOneAndUpdate( // if guild exists, update it
            {guild_id: msg.guildId}, 
            {$push: {content: {
              author:
                [
                  {
                    user_id: msg.author.id,
                    username: msg.author.username,
                    global_name: msg.author.globalName,
                    message: msgClipped,
                    message_id: msg.id, 
                    created_timestamp: msg.createdTimestamp,
                  },
                ],
                gpt_response: gptRes
              }
            }
          },
            {new: true}
          );

          return gptRes;
        } catch (err) {
          console.error(err);
        }
    }
}
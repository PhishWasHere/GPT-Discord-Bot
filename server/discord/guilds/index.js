const { chatCompletion } = require('../../config/gpt');
const { Guild } = require('../../models');
const mergeArr = require('../../utils/mergeArr');

module.exports = {
    newGuild: async (msg, msgClipped) => {
        try {
          guildData = new Guild ({
              guild_id: msg.guildId,
          });

          const prompt = `${msg.author.username}: ${msgClipped}}`

          await guildData.save(); // save guild to db
          await chatCompletion(prompt).then((completion) => res = completion);
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
    },
      
    existingGuild: async (msg, msgClipped, guildData) => {
        try {
          const messages = guildData.content.slice(0,10).map((message) => message.author[0].message); // gets last 10 messages from guild
          const user = guildData.content.slice(0,10).map((message) => message.author[0].global_name); // get last 10 users from guild 

          const responses = guildData.content.slice(0,10).map((message) => message.gpt_response); // get last 10 responses from guild
          
          const userPrompts = messages.map((message, i) => { // create prompts array
            return {
              role: 'user',
              content: `${user[i]}: ${message}}`
            };
          });

          const test = responses.map((response) => {
            return {
              role: 'assistant',
              content: response
            };
          });
          const sendMsg = `${msg.author.username}: ${msgClipped}` // create prompt to send to gpt

          await chatCompletion(sendMsg, userPrompts, test).then((completion) => res = completion);
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
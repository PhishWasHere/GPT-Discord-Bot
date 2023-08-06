const { GatewayIntentBits, Client, Partials } = require('discord.js');
const { User, Guild } = require ('../../models/index.js'); 
const { chatCompletion } = require('../gpt/index.js');
const { newGuild, existingGuild } = require('../../discord/guilds/index.js');
const { newUser, existingUser } = require('../../discord/directMessages/index.js');

const API_KEY = process.env.API_KEY;
const headers = {
  API_KEY
};

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel, Partials.Message],
});

client.on('message', async (msg) => { // todo: fix DM's
  console.log(msg);
  await msg.reply('👍');
});

client.on('messageCreate', async (msg) => { //move to subfolders when done

  try {
    ///////////////////guild section/////////////////
    if (!msg?.author.bot && msg?.content.startsWith('!!') ) { // ignore all messages unless they start with !! and are not from a bot
      const msgClipped = msg.content.slice(2).trim(); // removes !! from message

      const guildData = await Guild.findOne({ guild_id: msg.guildId });

      if (!guildData) { // if guild does not exist, create it
        const gptRes = await newGuild(msg, msgClipped);
        return msg.reply(gptRes); // send response to discord
      }

      const gptRes = await existingGuild(msg, msgClipped, guildData);
      msg.reply(gptRes); // send response to discord
    }

    //////////////////message section////////////////

    if (!msg?.author.bot && msg.channel.type === 1) { 
      const msgDm = msg.content;

      const userData = await User.findOne({ user_id: msg.author.id });

      if (!userData) {
        const gptRes = await newUser(msg, msgDm);

        return msg.reply(gptRes);
      }


    } 


  } catch (err) {
    console.error(`Server error: `, err);
    msg.reply(`internal server error. Error: ${err}`);
  }


  // if (!msg?.author.bot && msg.channel.type === 1) { 
  //   try {
  //     const msgDM = msg.content;

  //     const userData = await User.findOne({ user_id: msg.author.id });

  //     if (!userData) {
        

  //       return msg.reply(gptRes); 
  //     }

  //     const messages = userData.content.slice(0,10).map((message) => message.author[0].message); // gets last 10 messages from user
  //     const user = userData.content.slice(0,10).map((message) => message.author[0].global_name); // get last 10 users from user

  //     const prompts = messages.map((message, i) => { // create prompts array
  //       return {
  //         user: user[i],
  //         message: message
  //       };
  //     });

  //     await chatCompletion(msgDM, prompts).then((completion) => res = completion);
  //     const gptRes = res.content;

  //     await User.findOneAndUpdate(
  //       {user_id: msg.author.id}, 
  //       {$push: {content: {
  //         author: [
  //           {
  //             user_id: msg.author.id,
  //             username: msg.author.username,
  //             global_name: msg.author.globalName,
  //             message: msgDM,
  //             message_id: msg.id,
  //             created_timestamp: msg.createdTimestamp,
  //           }
  //         ],
  //         gpt_response: gptRes
  //       }}
  //     },
  //       {new: true}
  //     );
      
  //     msg.reply(gptRes); // send response to discord

  //   } catch (err) {
  //     console.error(`Server error: `, err);
  //     msg.reply(`internal server error. Error: ${err}`);
  //   }
  // }

});
 
module.exports = {client};

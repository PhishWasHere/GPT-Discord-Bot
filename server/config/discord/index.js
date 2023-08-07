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

  // if (!msg?.author.bot && msg?.content.startsWith('!!') || !msg?.author.bot && msg.channel.type === 1) {
  //   const devRes = 'currently in dev mode, try again later'
  //   msg.reply(devRes);
  // }

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
      const msgDm = msg.content.trim();

      const userData = await User.findOne({ user_id: msg.author.id });

      if (!userData) { // if user does not exist, create it
        const gptRes = await newUser(msg, msgDm);

        return msg.reply(gptRes);
      }

      const gptRes = await existingUser(msg, msgDm, userData);
      msg.reply(gptRes);
    } 

  } catch (err) {
    console.error(`Server error: `, err);
    msg.reply(`internal server error. Error: ${err}`);
  }
});
 
module.exports = {client};

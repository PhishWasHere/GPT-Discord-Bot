const { GatewayIntentBits, Client, Partials } = require('discord.js');
const Message = require('../../models/index');
const axios = require('axios');

const API_KEY = process.env.API_KEY;
const headers = {
  API_KEY
};

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message],
});

client.on('message', async (msg) => { // todo: fix DM's
  console.log(msg);
  await msg.reply('👍');
});

client.on('messageCreate', async (msg) => {
  if (!msg?.author.bot && msg?.content.startsWith('!!') ) { // ignore all messages unless they start with !! and are not from a bot
    try {
      const msgClipped = msg.content.slice(2).trim(); // removes !! from message
      const res = await axios.post('http://localhost:3001/api/gpt', {content: msgClipped}, {headers}) // send message to gpt api
      const gptRes = res.data.completion.content; // converts response to string

      newMessage = new Message ({
        guild_id: msg.guildId,
        id: msg.id,
        created_timestamp: msg.createdTimestamp,
        content: msgClipped,
        author: [
          {
            id: msg.author.id,
            username: msg.author.username,
            global_name: msg.author.globalName,
          },
        ],
        gpt_response: gptRes
      });

      await newMessage.save(); // save message to db (TTL 24h)

      msg.reply(gptRes); // send response to discord

    } catch (err) {
      // console.error(`Server error: `, err);
      msg.reply(`internal server error, please contact #silentwashere. Error: ${err}`);
    }
  }
});

module.exports = {client};
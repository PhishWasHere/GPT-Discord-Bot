const { GatewayIntentBits, Client, Partials } = require('discord.js');
const Message = require('../../models/index');
const axios = require('axios');

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
  //  console.log(msg);

  if (!msg?.author.bot && msg?.content.startsWith('!!') ) {
    try {
      const msgClipped = msg.content.slice(2).trim();
    
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
      });
      await newMessage.save();

      axios.post('http://localhost:3001/api/gpt', {content: msgClipped})
        .then(res => {
          console.log(res.data);
          msg.reply(res.data.completion);
        })
        .catch(err => {
          console.error(err);
          msg.reply('internal server error');
        });

    } catch (err) {
      console.error(`Server error: `, err);
      msg.reply(`internal server error, please contact #silentwashere. Error: ${err}`);
    }
  }

  if (msg?.content === '!ping') {
      await msg.reply('Pong!');
  }
});


module.exports = {client};
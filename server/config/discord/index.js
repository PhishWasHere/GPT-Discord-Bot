const { GatewayIntentBits, Client, Partials } = require('discord.js');
const WebSocket = require('ws');
const Message = require('../../models/index');

let wssInstance;

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

const setWssInstance = (wss) => {
  wssInstance = wss;
};

client.on('message', async (msg) => { // this doesnt fucking work, but messageCreate reads DM's too for whatever reason
  console.log(msg);
  await msg.reply('👍');
});

client.on('messageCreate', async (msg) => {
  // console.log(msg); // todo, save message to db, then reply based on message id

  if (!msg?.author.bot && msg?.content.startsWith('!!') ) {
    const msgClipped = msg.content.slice(2).trim();

    await wssInstance.clients.forEach((client) => {
      if (!client.readyState === WebSocket.OPEN) {
        msg.reply('internal server error')
      } 
      client.send(JSON.stringify({ message: msg }));
    });
    
    const resMsg = await Message.findOne().sort({ timestamp: -1 }).limit(1);
    const {content} = resMsg;
    msg.reply(content)

  }

  if (msg?.content === '!ping') {
      await msg.reply('Pong!');
  }
});



module.exports = {client, setWssInstance};
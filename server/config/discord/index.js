const { GatewayIntentBits, Client, Partials } = require('discord.js');
const WebSocket = require('ws');
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
  if (!msg?.author.bot && msg?.content.startsWith('!!') ) {
    const msgClipped = msg.content.slice(2).trim();
    console.log(msgClipped);

    await wssInstance.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message: msg }));
        }
    });
  }

  if (msg?.content === '!ping') {
      await msg.reply('Pong!');
  }
});



module.exports = {client, setWssInstance};
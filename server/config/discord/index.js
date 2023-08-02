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

client.on('message', async (message) => {
  console.log(message);
});

client.on('messageCreate', async (message) => {
  console.log(message.content);

  if (!message?.author.bot) {
    // Send the message content to all connected WebSocket clients
    wssInstance.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: message.content }));
      }
    });
    console.log(message.content);
  }

  if (message?.content === '!ping') {
    await message.reply('Pong!');
  }
});



module.exports = {client, setWssInstance};
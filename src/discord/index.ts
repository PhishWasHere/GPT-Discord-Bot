import { GatewayIntentBits, Client, Partials } from 'discord.js';
// models go here
//function import

const API_KEY = process.env.API_KEY;

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

const clientStart = async () => {
    client.login(process.env.DISCORD_TOKEN);
    client.once('ready', c => {
      console.log(`\x1b[35m> Ready!\x1b[0m Logged in as ${c.user.tag}`);
    });
}; 

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});


export {client, clientStart};


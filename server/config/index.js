const { GatewayIntentBits, Client, Partials } = require ('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});

client.on('message', async (message) => { // for DM's
    console.log(message);
});

client.on('messageCreate', async (message) => { // for guild/server messages
    console.log(message.content);

    if (!message?.author.bot) {
        // message.reply('Hello!');
        console.log(message.content);
    };
    
    if (message?.content === '!ping') {
        await message.reply('Pong!');
    }
});

module.exports = client;

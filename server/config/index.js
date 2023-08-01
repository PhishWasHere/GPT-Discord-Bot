const { GatewayIntentBits, Client } = require ('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on('messageCreate', async (message) => {
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

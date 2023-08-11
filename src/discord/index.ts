import { GatewayIntentBits, Client, Partials } from 'discord.js';
import { handleDm, handleGuild } from './messageCreate';

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
    try {
        client.login(process.env.DISCORD_TOKEN);
    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
    }
}; 

client.on('messageCreate', async (msg) => {
    try {
        // console.log(msg);
        if (!msg?.author.bot || !msg?.author.bot && msg.channelId == '801086256711860335') {
            let msgContent = msg.content.trim();
            
            switch(true) {
                //////////////////message section/////////////////
                case msg.channel.type === 1: // dm
                    await handleDm(msg, msgContent);
                break;
                
                ///////////////////guild section/////////////////
                case msg?.content.startsWith('!!'): // guild
                    msgContent = msgContent.slice(2).trim();
                    await handleGuild(msg, msgContent);
                break;
            }
        };
    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
        msg.reply(`internal server error.`);
    }
});

client.once('ready', c => {
    console.log(`\x1b[35m> Ready!\x1b[0m Logged in as ${c.user.tag}`);
});
export {client, clientStart};


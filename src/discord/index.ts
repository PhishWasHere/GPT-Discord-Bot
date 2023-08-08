import { GatewayIntentBits, Client, Partials } from 'discord.js';
import {Users, Guilds} from '../models';
import {newUser, existingUser} from './messageCreate/directMessage';

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
    try {        
        if (!msg?.author.bot && msg.author.username == 'silentwashere') {
            const msgContent = msg.content.trim();
            
            switch(true) {
                case msg.channel.type === 1: // db
                    const userData = await Users.findOne({ user_id: msg.author.id });
                    if (!userData) {
                        const gptRes = await newUser(msg, msgContent);
                        msg.reply(gptRes);
                    } const gptRes = await existingUser(msg, msgContent, userData);
                    msg.reply(gptRes);
                break;

            }
        };


    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
        msg.reply(`internal server error.`);
    }
});


export {client, clientStart};


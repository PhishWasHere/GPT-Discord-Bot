import { GatewayIntentBits, Client, Partials } from 'discord.js';
import {Users, Guilds} from '../models';
import {newUser, existingUser} from './messageCreate/directMessage';
import { newGuild, existingGuild } from './messageCreate/guilds';

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
        // console.log(msg);
        if (!msg?.author.bot || !msg?.author.bot && msg.channelId == '801086256711860335') {
            let msgContent = msg.content.trim();
            
            switch(true) {
                //////////////////message section/////////////////
                case msg.channel.type === 1: // dm
                    const userData = await Users.findOne({ user_id: msg.author.id });

                    if (!userData) {
                        const gptRes = await newUser(msg, msgContent);
                        msg.reply(gptRes);
                        break;
                    } 
                    
                    const gptRes = await existingUser(msg, msgContent, userData);
                    
                    msg.reply(gptRes);
                break;
                
                ///////////////////guild section/////////////////
                case msg?.content.startsWith('!!'): // guild
                    msgContent = msgContent.slice(2).trim();

                    const guildData = await Guilds.findOne({ guild_id: msg.guildId });
                    if (!guildData) {
                        const gptRes = await newGuild(msg, msgContent);
                        msg.reply(gptRes);
                        break;
                    }
                    const gptResponse = await existingGuild(msg, msgContent, guildData);
                    msg.reply(gptResponse);
                break;
            }
        };
    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
        msg.reply(`internal server error.`);
    }
});


export {client, clientStart};


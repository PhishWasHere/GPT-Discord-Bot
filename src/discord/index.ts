import { GatewayIntentBits, Client, Partials } from 'discord.js';
import {createCommands, commandArr} from './commands';
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
    try {
        client.login(process.env.DISCORD_TOKEN);
    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
    }
}; 

client.on('messageCreate', async (msg) => {
    try {
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

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    switch (commandName) {
        case 'mute':
            
        break;

    }
});


client.once('ready', async (c) => {
    console.log(`\x1b[35m> Ready!\x1b[0m Logged in as ${c.user.tag}`);

    const dev_Guild = process.env.GUILD_ID;
    const guild = client.guilds.cache.get(dev_Guild!);
    let commands;

    if (guild) {
        commands = guild.commands;
    }
    commands = client.application?.commands;

    await createCommands(commandArr!, commands);
            
});
export {client, clientStart};


import { GatewayIntentBits, Client, Partials } from 'discord.js';
import { handleDm, handleGuild } from './messageCreate';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { createCommands, commandArr } from './commands';
import * as playCommand from './commands';
// just watch that 1 tutorial and modify it later
// const commands = [
//     playCommand.data.toJSON(),
// ]

// const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN as string);

// (async () => {
//     try {
//         console.log('\x1b[33m> Started refreshing application (/) commands.\x1b[0m');

//         await rest.put(
//             Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string),
//             { body: commands },
//         );

//         console.log('\x1b[33m> Successfully reloaded application (/) commands.\x1b[0m');
//     } catch (error) {
//         console.error(error);
//     }
// })();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
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
                    await handleDm(msg, msgContent);
                break;
                
                ///////////////////guild section/////////////////
                case msg?.content.startsWith('!!') && msg?.channel.type === 0: // guild
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
import {test } from './commands';
client.on('interactionCreate', async (interaction) => {
    try{
        if(!interaction.isCommand()) return;

        const {commandName, options} = interaction;
        switch (commandName) {
            case 'play':
                // await playCommand.execute(interaction);
            break;
            case 'test':
                await test(interaction, options);
            break;
        }

        // const command = commandArr.find(c => c.name === commandName);

        // if(command) {
        //     await command.execute(interaction);
        // } else {
        //     await interaction.reply({content: 'Command not found', ephemeral: true});
        // }
    }catch(err){

    }
});

client.once('ready', c => {
    console.log(`\x1b[35m> Ready!\x1b[0m Logged in as ${c.user.tag}`);

    const guildId = process.env.GUILD_ID;
    const guild = client.guilds.cache.get(guildId!);

    let commands;

    if( guild ) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    createCommands(commandArr, commands);
});
export {client, clientStart};


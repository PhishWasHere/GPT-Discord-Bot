import { GatewayIntentBits, Client, Partials, GuildMember, Permissions, TextInputBuilder, ModalBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior, VoiceConnection } from '@discordjs/voice';
import { Player, useMainPlayer } from 'discord-player'
import { handleDm, handleGuild } from './messageCreate';
import { CmdBuilder, cmdArr } from './commands';
import DisTube from 'distube';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel, Partials.Message],
});

const distube = new DisTube(client, {
    emitNewSongOnly: true,
});

const player = new Player(client);
player.extractors.loadDefault();

const clientStart = async () => {
    try {
        client.login(process.env.DISCORD_TOKEN);
        
    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
    }
};

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;

    if (commandName === 'play') {
        try {
            const url = options.get('url')?.value?.toString().trim();
            
            const guild = client.guilds.cache.get(interaction.guildId!);
            
            
            const member = interaction.member as GuildMember;
            const channel = member.voice.channel;
            // console.log(channel);
            
            if (!channel) {
                interaction.reply('You must be in a voice channel to use this command.');
                return;
            }

            distube.play(channel, url!, {
                metadata: interaction,
            });
            
            interaction.reply(`a`);
    
        } catch (err) {
            console.error(err);
            interaction.reply(`Server error: ${err}`);
        }
    }
})

// client.on('messageCreate', async (msg) => {
//     try {
//         // console.log(msg);
//         if (!msg?.author.bot) {
//             let msgContent = msg.content.trim();
            
//             switch(true) {
//                 //////////////////message section/////////////////
//                 case msg.channel.type === 1: // dm                
//                     await handleDm(msg, msgContent);
//                 break;
                
//                 ///////////////////guild section/////////////////
//                 case msg?.content.startsWith('!!') && msg?.channel.type === 0: // guild
//                     msgContent = msgContent.slice(2).trim();                    
//                     await handleGuild(msg, msgContent);
//                 break;
//             }
//         };
//     } catch (err) {
//         console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
//         msg.reply(`internal server error.`);
//     }
// });

client.on('ready', async () => { // deletes all commands, then rebuilds them on startup
    const app = await client.application?.fetch();

    const commands = await app!.commands.fetch();

    for (const command of commands.values()) {
        await command.delete();
        console.log(`\x1b[31m> Deleted command\x1b[0m ${command.name}`);
    }

    CmdBuilder(app!);
    

    console.log('\x1b[35m> Ready!\x1b[0m Logged in as', client.user?.tag);
});
export {client, clientStart};
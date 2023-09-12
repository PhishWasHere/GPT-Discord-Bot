import { GatewayIntentBits, Client, Partials, SlashCommandBuilder} from 'discord.js';
import { handleDm, handleGuild } from './messageCreate';
import { Player } from 'discord-player';
import { data } from './commands';

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

const player = new Player(client, {
    // leaveOnEmpty: true,
    // leaveOnEnd: true,
    // leaveOnStop: true,
    // leaveOnEmptyCooldown: 1000 * 60 * 2.5,
    // leaveOnEndCooldown: 1000 * 60 * 2.5,
    // leaveOnStopCooldown: 1000 * 60 * 2.5,
    // autoSelfDeaf: true,
    // enableLive: true,
    // ytdlDownloadOptions: {
    //     filter: 'audioonly',
    //     highWaterMark: 1 << 25,
    //     quality: 'highestaudio',
    //     dlChunkSize: 0,
    //     requestOptions: {
    //         headers: {
    //             cookie: process.env.YT_COOKIE
    //         }
    //     }
    // },
});

const clientStart = async () => {
    try {
        client.login(process.env.DISCORD_TOKEN);
        await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');
        
    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
    }
};

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options }: {commandName: string, options?: any} = interaction;

    if( commandName === 'test') {
        const optionValue = options.getString('option1');        
        await interaction.reply(`a ${optionValue}`);
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

    commands.forEach(async (command) => {
      await command.delete();
      console.log(`\x1b[31m> Deleted command\x1b[0m ${command.name}`);
    });
    
    // const cmd = {...data}
    await app!.commands.create(data);
    console.log('\x1b[34m> Created commands!\x1b[0m');
    console.log('\x1b[35m> Ready!\x1b[0m Logged in as', client.user?.tag);
});
export {client, clientStart};
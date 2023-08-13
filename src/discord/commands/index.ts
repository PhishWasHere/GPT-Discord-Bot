import discord, { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { play } from "./play";

// const data = new SlashCommandBuilder()
//     .setName('play')
//     .setDescription('Plays a song')
//     .addStringOption(option =>
//         option
//             .setName('title')
//             .setDescription('The title to play')
//             .setRequired(false))
//     .addStringOption(option =>
//         option
//             .setName('url')
//             .setDescription('The url of the song to play')
//             .setRequired(false));

// async function execute(interaction: any) {
//     await play(interaction);
// }

// export { data, execute }

        

export const createCommands = async (commandArr: any, commands: any) => {
    for (const command of commandArr) {
        await commands?.create({
            name: command.name,
            description: command.description,
        });
    }
}

export const test = async (interaction: any, options: any) => {
    const option1 = options.getString('option1');
    const option2 = options.getString('option2');

    if (option1 && option2) {
        interaction.reply({
            content: `option1: ${option1}, option2: ${option2}`,
            ephemeral: true,
        });
        return;
    } else {

        interaction.reply({
            content: `option1: ${option1} b`,
            ephemeral: true,
        });
    }
}


export const commandArr = [
    // { name: 'mute', description: 'Mutes a user!', options: [
    //     {
    //         name: 'user',
    //         description: 'The user to mute',
    //         type: 'USER',
    //         required: true,
    //     },
    //     {
    //         name: 'reason',
    //         description: 'The reason for muting',
    //         type: 'STRING',
    //         required: false,
    //     },
    //     {
    //         name: 'time',
    //         description: 'The time to mute the user for',
    //         type: 'STRING',
    //         required: false,
    //     }
    // ]},
    // { name: 'unmute', description: 'Unmutes a user!', options: [
    //     {
    //         name: 'user',
    //         description: 'The user to unmute',
    //         type: 'USER',
    //         required: true,
    //     },
    //     {
    //         name: 'reason',
    //         description: 'The reason for unmuting',
    //         type: 'STRING',
    //         required: false,
    //     }
    // ]},
    {name: 'test', description: 'Test command!', options: [
        {
            name: 'option1',
            description: 'Test',
            type: discord.Constants.ApplicationCommandOptionTypes.STRING,
            required: true,
        },
        {
            name: 'option2',
            description: 'Test',
            type: 'STRING',
            required: false,
        },    
    ]},
    {name: 'play', description: 'Plays a song', options: [
        {
            name: 'title',
            description: 'The song to play',
            type: 'STRING',
            required: false,
        },
        {
            name: 'url',
            description: 'The url of the song to play',
            type: 'STRING',
            required: false,
        }
    ]},
    // {name: 'stop', description: 'Stops the song!'},
    // {name: 'skip', description: 'Skips the song!'},
    // {name: 'pause', description: 'Pauses the song!'},
    // {name: 'resume', description: 'Resumes the song!'},
    // {name: 'join', description: 'Joins the voice channel!'},
    // {name: 'leave', description: 'Leaves the voice channel!'},

];
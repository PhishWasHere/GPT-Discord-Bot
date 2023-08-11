import { SlashCommandBuilder } from "discord.js";

export const createCommands = async (commandArr: any, commands: any) => {
    for (const command of commandArr) {
        await commands?.create({
            name: command.name,
            description: command.description,
        });
    }
}

export const commandArr = [
    { name: 'mute', description: 'Mutes a user!', options: [
        {
            name: 'user',
            description: 'The user to mute',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for muting',
            type: 'STRING',
            required: false,
        },
        {
            name: 'time',
            description: 'The time to mute the user for',
            type: 'STRING',
            required: false,
        }
    ]},
    { name: 'unmute', description: 'Unmutes a user!', options: [
        {
            name: 'user',
            description: 'The user to unmute',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for unmuting',
            type: 'STRING',
            required: false,
        }
    ]},
];
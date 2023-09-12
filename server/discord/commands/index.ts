
import { SlashCommandBuilder } from "discord.js";


export const cmdArr = [
    {
        name: 'test',
        description: 'Test command!',
        options: [
            {
                name: 'option1',
                description: 'Test',
                type: 3,
                required: true
            }
        ]
    },
    {
        name: 'test2',
        description: 'Test command!',
    }
]



export const data = new SlashCommandBuilder() 
    .setName('test')
    .setDescription('Test command!')
    .addStringOption(option => option.setName('option1')
        .setDescription('Test')
        .setRequired(true))


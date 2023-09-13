import { SlashCommandBuilder, ClientApplication } from "discord.js";

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
        name: 'play',
        description: 'Play a thing!',
        options: [
            {
                name: 'url',
                description: 'youtube url',
                type: 3,
                required: true
            }
        ]
    }
]


export function CmdBuilder(app: ClientApplication) {
    try {        
        cmdArr.forEach(async (cmd) => {
            const cmdBuilder = new SlashCommandBuilder()
              .setName(cmd.name)
              .setDescription(cmd.description);
        
            if (cmd.options) {
              cmd.options.forEach((option) => {
                cmdBuilder.addStringOption((opt) =>
                  opt
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required || false)
                );
              });
            }
        
            await app.commands.create(cmdBuilder.toJSON());
            console.log(`\x1b[34m> Created command\x1b[0m ${cmd.name}`);
        });

    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
    }
}

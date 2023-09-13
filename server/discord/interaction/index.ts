import { SlashCommandBuilder, ClientApplication } from "discord.js";

export const cmdArr = [
    {
        name: 'play',
        description: 'Play a thing',
        options: [
            {
                name: 'title',
                description: 'Youtube url or title',
                type: 3,
                required: true
            }
        ]
    },
    {
        name: 'stop',
        description: 'Stop playing',
    },
]

export async function cmdBuilder(app: ClientApplication) {
    try {        
        cmdArr.forEach(async (cmd) => { // for each command in cmdArr, create a command
            const builder = new SlashCommandBuilder()
              .setName(cmd.name)
              .setDescription(cmd.description);
        
            if (cmd.options) { // if command has options, add them
              cmd.options.forEach((option) => {
                builder.addStringOption((opt) =>
                  opt
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required || false)
                );
              });
            }
            await app.commands.create(builder.toJSON());

            console.log(`\x1b[34m> Created command\x1b[0m ${cmd.name}`);
        });

    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
    }
}

import { GuildMember, EmbedBuilder, CommandInteraction} from 'discord.js';
import DisTube from 'distube';

export const play = (async (interaction: CommandInteraction, distube: DisTube) => {
    try {

        interaction.reply({
            embeds: [
                new EmbedBuilder() // loading embed
                    .setTitle(`Loading...`)
            ],
        });

        const input = interaction.options.get('Title')?.value?.toString().trim(); // gets url or title
            
        if (!input) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`You must provide a Youtube URL or search term.`)
                        .setColor('#a8323a')
                ],
            });
            return;
        }
        
        const member = interaction.member as GuildMember; // gets member
        const channel = member.voice.channel; // gets voice channel, need to do it this way since no voice state in interaction :<
        
        if (!channel) {
            interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`You must be in a voice channel to use this command.`)
                        .setColor('#a8323a')
                ],
            });
            return;
        }
        
        distube.play(channel, input, {
            metadata: interaction,
        });

        return distube.on('playSong', (queue, song) => {
            return interaction.editReply({ // now playing embed
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Now Playing: ${song.name}`)
                        .setDescription(`[Link](${song.url}) | ${song.formattedDuration}`)
                        .setColor('#21d4de')
                ],
            });
        });

    } catch (err) {
        console.error(err);
        interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Internal Server Error`)
                    .setColor('#a8323a')
            ],
        });
    }
});
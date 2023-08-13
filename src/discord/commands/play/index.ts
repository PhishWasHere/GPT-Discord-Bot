import { joinVoiceChannel, createAudioResource, StreamType, AudioPlayerStatus, AudioPlayer, VoiceConnection } from '@discordjs/voice';
import { CommandInteraction, Message } from 'discord.js';
import ytdl from 'ytdl-core';
import ytsr from 'ytsr';

const player = new AudioPlayer();
let connection: VoiceConnection;
const queue: string[] = [];

// const getVideoUrl = async (title: string) => {
//     const video = await ytsr(title, { limit: 1 });
//     if (!video.items || video.items.length === 0) {
//         throw new Error('Video not found');
//     }
//     return video.items[0].url;
// };

export const play = async (msg: Message , url?: string, title?: string) => {
   try {
        const channel = msg.member?.voice.channel;
        if (!channel) {
            msg.reply('You must be in a voice channel to use this function.');
            return;
        }
        connection = joinVoiceChannel({
            channelId: channel?.id as string,
            guildId: channel?.guild.id as string,
            adapterCreator: channel?.guild.voiceAdapterCreator as any,
        });

        if(!url && title) {
            try {
                // url = await getVideoUrl(title);
            } catch (error) {
                console.error('Error getting video URL:', error);
                msg.reply('Error getting video URL.');
                return;
            }
        }

        if(url) {
            const stream = ytdl(url!, {filter: 'audioonly'});
            const resource = createAudioResource(stream, {inputType: StreamType.Arbitrary});
            player.play(resource);
            connection.subscribe(player);
        } 

    } catch (err) {
        console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
        msg.reply(`internal server error.`);
    }       
}




//code to play music
// export const play = async (interaction: any, player: AudioPlayer, connection: VoiceConnection) => {
//     try {
//         const channel = interaction.member.voice.channel;
//         if (!channel) return interaction.reply({content: 'You must be in a voice channel to use this command.', ephemeral: true});

//         if (!connection) {
//             connection = joinVoiceChannel({
//                 channelId: channel.id,
//                 guildId: channel.guild.id,
//                 adapterCreator: channel.guild.voiceAdapterCreator,
//             });
//         }

//         const stream = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
//             inputType: StreamType.Arbitrary,
//         });

//         player.play(stream);
//         connection.subscribe(player);

//         player.on(AudioPlayerStatus.Idle, () => {
//             if (queue.length > 0) {
//                 const nextSong = queue.shift();
//                 play(nextSong, player, connection);
//             } else {
//                 connection.destroy();
//             }
//         });

//         return interaction.reply({content: 'Playing', ephemeral: true});
//     } catch (err) {
//         console.error(`\x1b[31m> Server error: \x1b[0m>`, err);
//         interaction.reply(`internal server error.`);
//     }
// }

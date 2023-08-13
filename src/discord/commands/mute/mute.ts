
export const mute =async (commands: any, options: any) => {
    const userOption = options.get('user');
    const reasonOption = options.get('reason');
    const timeOption = options.get('time');

    const userToMute = userOption?.user;
    const reason = reasonOption?.value as string | undefined;
    const time = timeOption?.value as string | undefined;

    const mutedRole = commands.guild.roles.cache.find(role => role.name === 'Muted');
    if (!mutedRole) return commands.reply('Muted role not found!');
    if (!userToMute) return commands.reply('User not found!');
    if (userToMute.roles.cache.has(mutedRole.id)) return commands.reply('User is already muted!');
    if (userToMute.roles.cache.has(commands.guild.roles.everyone.id)) return commands.reply('Cannot mute this user!');
    if (userToMute.roles.highest.position >= commands.member.roles.highest.position) return commands.reply('Cannot mute this user!');
    if (userToMute.id === commands.member.id) return commands.reply('Cannot mute yourself!');
    if (userToMute.id === commands.guild.ownerId) return commands.reply('Cannot mute the server owner!');
    if (userToMute.id === commands.client.user?.id) return commands.reply('Cannot mute the bot!');
    if (userToMute.id === commands.guild.me?.id) return commands.reply('Cannot mute the bot!');

    const muteEmbed = {
        color: '#ff0000',
        title: 'Mute',

        fields: [
            {
                name: 'User',
                value: userToMute,
                inline: true,
            },
            {
                name: 'Moderator',
                value: commands.member,
                inline: true,
            },
            {
                name: 'Reason',
                value: reason || 'No reason provided',
                inline: true,
            },
            {
                name: 'Time',
                value: time || 'No time provided',
                inline: true,
            }
        ],
        timestamp: new Date(),
    };

    await userToMute.roles.add(mutedRole.id);
    await commands.reply({ embeds: [muteEmbed] });
}   
const { client } = require('../../config/discord/index.js');

client.on('messageCreate', async (msg) => {
    console.log(msg);
    msg.reply('👍');
});


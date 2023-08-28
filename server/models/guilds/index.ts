import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
    {
      author: [
        {
            user_id: { type: String, required: true, default: 'init' },
            username: { type: String, required: true, default: 'init' },
            global_name: { type: String, required: true, default: 'init' },
            message: { type: String, required: true, default: 'init' },
            message_id: { type: String, required: true, default: 'init' },
            created_timestamp: { type: Date, required: true, expires: '7d' },
        },
      ],
      gpt_response: { type: String, required: true, default: null },
      tokens: [ 
        {
            prompt: { type: Number, required: true },
            completion: { type: Number, required: true },
            total: { type: Number, required: true },
        },
      ],
      expires: { type: Date, default: Date.now, expires: '7d' },
    },
);
 
const guildSchema = new mongoose.Schema(
    {
        owner_id: { type: String, required: true },
        guild_id: { type: String, required: true },
        guild_name: { type: String, required: true },
        icon: { type: String, required: false, default: null },
        content: [ contentSchema ],
        created_at: { type: Date, default: Date.now },
        credit: { type: Number, required: true, default: 0 }, //credit to use persistent data
        eula: { type: Boolean, required: true, default: false }, //eula agreement to use persistent data
    },
);
  
const Guilds = mongoose.model('Guilds', guildSchema);

export default Guilds;
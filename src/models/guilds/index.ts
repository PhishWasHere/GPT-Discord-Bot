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
            created_timestamp: { type: Number, required: true, default: 0 },
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
    },
    {
      expires: '7d', //ttl 1month
    }
);

 
const guildSchema = new mongoose.Schema(
    {
        guild_id: { type: String, required: true },
        content: [ contentSchema ],
        created_at: { type: Date, default: Date.now },
    },
    {
        capped: true,
        size: 1048576,
        max:10
    }
);
  
const Guilds = mongoose.model('Guilds', guildSchema);

export default Guilds;
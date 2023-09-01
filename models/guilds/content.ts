import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
    {
      guild: { type: mongoose.Schema.Types.ObjectId, ref: 'Guilds', required: true },
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

const Guild_Content = mongoose.model('Guild_Content', contentSchema);

export default Guild_Content;
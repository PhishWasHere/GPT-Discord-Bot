const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema(
  {
    guild_id: { type: String, required: true },
    content: [
      {
        author:[ 
          { 
            user_id: { type: String, required: true, default: 'init' },
            username: { type: String, required: true, default: 'init' },
            global_name: { type: String, required: true, default: 'init' },
            message: { type: String, required: true, default: 'init' },
            message_id: { type: String, required: true, default: 'init' },
            created_timestamp: { type: Number, required: true, default: 0 },
          }
        ],
        gpt_response: { type: String, required: true, default: null },
      }
    ],
    created_at: { type: Date, default: Date.now },
  },
  {
     //TTL removed for now, set to 1month (thanks shampoo)
  }
);

guildSchema.index({ created_at: 1 }, { expireAfterSeconds: 86400 });
const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;
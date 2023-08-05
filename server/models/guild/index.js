const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema(
  {
    guild_id: { type: String },
    content: [
      {
        author:[ 
          { 
            id: { type: String, required: true },
            username: { type: String, required: true },
            global_name: { type: String, required: true },
          }
        ],
        id: { type: String, required: true },
        message: { type: String, required: true },
        created_timestamp: { type: Number, required: true },
        gpt_response: { type: String, required: true, default: null },
      }
    ],
    created_at: { type: Number, default: Date.now },
  },
  {
    expires: 86400 , //TTL 1 day
  }
);

guildSchema.index({ created_at: 1 }, { expireAfterSeconds: 86400 });
const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    guild_id: { type: String },
    id: { type: String, required: true },
    created_timestamp: { type: String, required: true },
    content: { type: String, required: true },
    author:[ 
      { 
        id: { type: String, required: true },
        username: { type: String, required: true },
        global_name: { type: String, required: true },
      }
    ],
    gpt_response: { type: String, default: null },
    created_at: { type: Date, default: Date.now },
  },
  {
    expires: 86400 , // 1 day
  }
);

// messageSchema.index({ created_at: 1 }, { expireAfterSeconds: 86400 });
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
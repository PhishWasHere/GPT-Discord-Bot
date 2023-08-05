const mongoose = require('mongoose');
const ttl = require('../utils/index.js');

const userSchema = new mongoose.Schema(
  { 
    id: { type: String, required: true },
    created_timestamp: { type: Number, required: true },
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
    expires: ttl , //TTL 30 days
  }
);

userSchema.index({ created_at: 1 }, { expireAfterSeconds: ttl });
const User = mongoose.model('User', userSchema);

module.exports = User;
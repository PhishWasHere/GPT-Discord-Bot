const mongoose = require('mongoose');

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
  },
  {
    expires: '30d', //ttl 1month
  }
);


const userSchema = new mongoose.Schema(
  { 
    content: [ contentSchema ],
    created_at: { type: Date, default: Date.now },
  },

);

const User = mongoose.model('User', userSchema);

module.exports = User;
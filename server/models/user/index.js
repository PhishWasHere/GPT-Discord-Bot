const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    message: { type: String, required: true},
    message_id: { type: String, required: true },
    created_timestamp: { type: Number, required: true },
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
    expires: '30d', //ttl 1month
  }
);


const userSchema = new mongoose.Schema(
  { 
    user_id: { type: String, required: true, default: 'init' },
    username: { type: String, required: true, default: 'init' },
    global_name: { type: String, required: true, default: 'init' },
    content: [ contentSchema ],
    created_at: { type: Date, default: Date.now },
  },

);

const User = mongoose.model('User', userSchema);

module.exports = User;
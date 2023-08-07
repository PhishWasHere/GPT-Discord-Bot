const mongoose = require('mongoose');
const errorSchema = new mongoose.Schema(
    {
        prompt: { type: String, required: true, default: null },
        content: { type: String, required: true, default: null },
        status: { type: String, required: true, default: null },
    }
);

const PromptError = mongoose.model('Error', errorSchema);

module.exports = PromptError;
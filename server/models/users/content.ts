import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        global_name: { type: String, required: true },
        message: { type: String, required: true},
        message_id: { type: String, required: true },
        created_timestamp: { type: Date, required: true },
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

export const Content = mongoose.model('Content', contentSchema);

export default Content;
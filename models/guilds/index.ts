import mongoose from 'mongoose';
 
const guildSchema = new mongoose.Schema(
    {
        owner_id: { type: String, required: true },
        guild_id: { type: String, required: true },
        guild_name: { type: String, required: true },
        icon: { type: String, required: false, default: null },
        created_at: { type: Date, default: Date.now },
        credit: { type: Number, required: true, default: 0 }, //credit to use persistent data
        eula: { type: Boolean, required: true, default: false }, //eula agreement to use persistent data
        content: [{type: mongoose.Schema.Types.ObjectId, ref: 'Guild_Content'}]
    },
);
  
guildSchema.virtual('contents', {
    ref: 'Guild_Content',
    localField: '_id',
    foreignField: 'guild',
    justOne: false
});

const Guilds = mongoose.model('Guilds', guildSchema);

export default Guilds;
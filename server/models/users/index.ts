import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    { 
        user_id: { type: String, required: true },
        username: { type: String, required: true },
        avatar: { type: String, required: false, default: null },
        created_at: { type: Date, default: Date.now },
        credit: { type: Number, required: true, default: 0 }, //credit to use persistent data
        eula: { type: Boolean, required: true, default: false }, //eula agreement to use persistent data
        guilds: { type: Array, required: true, unique: true,  default: [] }, //guilds the user is in
        content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }]
    }
);

userSchema.virtual('contents', {
    ref: 'Content', 
    localField: '_id', 
    foreignField: 'user', 
    justOne: false 
});


const Users = mongoose.model('Users', userSchema);
 
export default Users;
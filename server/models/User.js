import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    profileImage: {
        type: String,
        default: '',
    },
    password: String,
    role: { type: String, default: 'User' }
});

export default mongoose.model('User', userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    phoneNumber: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['Customer', 'Admin'],
        default: 'Customer'
    },
}, {
    timestamps: true
})

const userModel = mongoose.model('user', userSchema);

export default userModel
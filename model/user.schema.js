import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    phone: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['Customer', 'Admin'],
        default: 'Customer'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
}, {
    timestamps: true
})

const userModel = mongoose.model('user', userSchema);

export default userModel
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures emails are unique
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now, // Automatically sets the creation date
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username is already exist"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email is already exist"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
})

module.exports = mongoose.model("users", userSchema);
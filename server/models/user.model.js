const mongoose = require('mongoose');

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    budget: {
        type: Number,
        default: 0,
    },
    expense: {
        type: Number,
        default: 0,
    },
    owes: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
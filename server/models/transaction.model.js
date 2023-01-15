const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    expense: {
        type: Number,
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
    },
    divideAmong: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    category: {
        type: String,
        enum: ['food', 'drink', 'entertainment', 'other'],
        required: true,
    },
    settledBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isSettled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
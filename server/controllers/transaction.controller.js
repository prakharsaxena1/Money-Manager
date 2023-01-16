const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

// TRANSACTION MANAGEMENT
// CRUD
const createTransaction = async (req, res) => {
    try {
        const { amount, divideAmong, category, settledBy } = req.body;
        let isSettled = false;
        if (divideAmong.every((val, index) => val === settledBy[index])) {
            isSettled = true;
        }
        const paidBy = req.user.id;
        let message = "-";
        if (req.body.message !== undefined) {
            message = req.body.message;
        }
        const expense = amount / (divideAmong.length + 1)
        const user = await User.findOne({ _id: req.user.id });
        user.expense += expense;
        await user.save()
        const transaction = await Transaction.create({
            amount, paidBy, divideAmong, category, message, settledBy, isSettled,
        });
        return res.json({
            status: "success",
            message: "transaction added",
            data: transaction,
        });
    } catch (err) {
        res.status(404)
        res.json({ status: "failed", message: err.message })
    }
};

const getTransaction = async (req, res) => {
    const { category, startDate, endDate } = req.query;
    try {
        const transactions = await Transaction.find({})
            .populate('paidBy', 'username')
            .populate('divideAmong', 'username')
            .populate('settledBy', 'username');
        let filtered = [...transactions];
        if (category !== "") {
            filtered = filtered.filter((element) => element.category === category);
        }
        // Start date
        if (startDate !== undefined) {
            filtered = filtered.filter(
                (element) => (new Date(element.createdAt).getTime() >= new Date(startDate).getTime())
            )
        }
        // enddate
        if (endDate !== undefined) {
            filtered = filtered.filter(
                (element) =>
                    new Date(element.createdAt).getTime() <= new Date(endDate).getTime()
            );
        }
        let allUser = [];
        for (const transaction of transactions) {
            if (transaction.paidBy.username === req.user.username) {
                allUser.push(transaction);
            } else {
                const users = transaction.divideAmong;
                for (const user of users) {
                    if (user.username === req.user.username) {
                        allUser.push(transaction);
                    }
                }
            }
        }
        const pending = [];
        allUser.forEach((obj) => {
            if (obj.settledBy.length === 0 && obj.paidBy.username !== req.user.username) {
                pending.push(obj);
            } else if (obj.settledBy.length > 0 && obj.paidBy.username !== req.user.username) {
                let flag = true;
                for (const i of obj.settledBy) {
                    if (i.username === req.user.username || obj.paidBy.username === req.user.username) {
                        flag = false;
                    }
                }
                if (flag === true) {
                    pending.push(obj);
                }
            }
        });
        return res.json({
            status: "success",
            data: {
                allUser,
                pending,
                filtered,
            },
        });
    } catch (err) {
        res.status(404)
        res.json({ status: "failed", message: err.message })
    }
};

// DEV
const getAllTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('paidBy', 'username')
            .populate('divideAmong', 'username')
            .populate('settledBy', 'username');
        // let data = transactions;
        return res.json({
            status: "success",
            count: transactions.length,
            data: transactions,
        });
    } catch (err) {
        res.status(404)
        res.json({ status: "failed", message: err.message })
    }
};

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findOne({ _id: id });
        transaction.settledBy.push(req.user.id);
        const value = transaction.settledBy.every((val, index) => val._id === transaction.divideAmong[index]._id);
        if (value === true) {
            transaction.isSettled = true;
        }
        await transaction.save()
        return res.json({
            status: "success",
            data: transaction,
        });
    } catch (err) {
        res.status(404)
        res.json({ status: "failed", message: err.message })
    }
};

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await Transaction.deleteOne({ _id: id });
        return res.status(204).send();
    } catch {
        res.status(404)
        res.json({ status: "failed", message: "transaction doesn't exist!" })
    }
};

const getFriendOwes = async (req, res) => {
    try {
        const userData = await User
            .findOne({ _id: req.user.id })
            .populate('friends', 'username email');
        const transactions = await Transaction.find({})
            .populate('paidBy', 'username email')
            .populate('divideAmong', 'username email')
            .populate('settledBy', 'username email');

        const { friends } = userData;
        const newObj = [];
        for (const transaction of transactions) {
            // remove settled transactions
            if (transaction.divideAmong.length === transaction.settledBy.length || transaction.paidBy.email !== req.user.email) {
                continue;
            }
            newObj.push({
                amount: transaction.amount,
                payTo: transaction.paidBy.email,
                divideAmong: transaction.divideAmong.map((obj) => (obj.email)),
                settledBy: transaction.settledBy.map((obj) => (obj.email))
            });
        }
        const newFriendsObj = friends.map((friend) => {
            friend.owes = 0;
            for (const transaction of newObj) {
                if (transaction.divideAmong.includes(friend.email) && !transaction.settledBy.includes(friend.email)) {
                    friend.owes += Math.round(transaction.amount / (transaction.divideAmong.length + 1))
                }
            }
            return friend;
        })
        return res.json({
            status: "success",
            count: newFriendsObj.length,
            data: newFriendsObj,
        });
    } catch (err) {
        res.status(404)
        res.json({ status: "failed", message: err.message })
    }
};
module.exports = {
    createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getFriendOwes,
    getAllTransaction,
}
const User = require('../models/user.model');

const getUserInfo = async (req, res) => {
    try {
        const user = await User
            .findOne({ _id: req.user.id })
            .populate('friends', 'username email')
        if (user !== null) {
            return res.json({
                status: "success",
                data: user,
            });
        }
        return res.json({
            status: "failed",
            message: "Incorrect user id"
        });
    } catch (err) {
        res.status(404)
        res.json({ status: "failed", message: err.message })
    }
};

const updateUserBudget = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        if (req.body.budget !== undefined) {
            user.budget = req.body.budget;
        }
        await user.save()
        return res.json({
            status: "success",
            data: user,
        });
    } catch (err) {
        res.status(404)
        res.json({ status: "failed", message: err.message })
    }
};

module.exports = {
    getUserInfo,
    updateUserBudget,
}
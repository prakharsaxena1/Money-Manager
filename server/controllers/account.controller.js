const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// ACCOUNT MANAGEMENT
// LOGIN
const accountLogin = async (req, res) => {
    try {
        const { email: user_email, password: user_password } = req.body;
        const user = await User.findOne({ email: user_email }).select("+password");
        if (user !== null && user.password === user_password) {
            const token = 'bearer ' + jwt.sign({
                id: user._id,
                username: user.username,
                email: user.email,
            }, process.env.TOKEN_SECRET);
            return res
                .cookie('authorization', token, { expires: new Date(Date.now() + 1800 * 1000) })
                .json({
                    status: "success",
                    message: "login successful :)",
                    token,
                });
        }
        return res.json({
            status: "failed",
            message: "Incorrect credentials"
        });
    } catch (err) {
        res.status(404)
        res.json({ status: "failed", message: err.message })
    }
};

const accountRegister = async (req, res) => {
    try {
        const { email: user_email, password: user_password, username: user_username } = req.body;
        const user = await User.findOne({ email: user_email });
        if (user == null) {
            const newuser = await User.create({
                username: user_username,
                email: user_email,
                password: user_password,
            });
            const token = 'bearer ' + jwt.sign({
                id: newuser._id,
                username: newuser.username,
                email: newuser.email,
            }, process.env.TOKEN_SECRET);
            return res
                .cookie('authorization', token, { expires: new Date(Date.now() + 1800 * 1000) })
                .json({
                    status: "success",
                    message: "Registeration successful :)",
                    token,
                });
        }
        return res.json({
            status: "failed",
            message: "Email already in use"
        });
    } catch (err) {
        res.status(404)
        res.json({ status: "failed", message: err.message })
    }
};

// DEV ONLY
const getAllUsers = async (req, res) => {
    const users = await User.find({}, { username: 1, friends: 1 }).populate('friends', 'username')
    return res.json({
        status: "success",
        count: users.length,
        data: users,
    });
};

module.exports = {
    accountLogin,
    accountRegister,
    getAllUsers
}
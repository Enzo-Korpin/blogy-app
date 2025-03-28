const Users = require("../models/users.js");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');


const handleRegister = async (req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const messages = errors.array().map(e => e.msg);
            return res.status(404).json({ messages });
        }

        const { fullName, userName, password, confirmPassword } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await Users.create({
            fullName: fullName,
            userName: userName,
            password: hashedPassword,
            isAdmin: false
        });
        res.status(200).json({ message: "You have been registered successfully ✅" });

    } catch (e) {
        return res.status(500).json({ Error: e.message });
    }
}
const handleLogin = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const messages = errors.array().map(e => e.msg)
            return res.status(404).json({ messages })
        }

        
        const { userName, password } = req.body;
        const user = await Users.findOne({ userName: userName })

        req.session.userId = user._id;
        res.status(200).json({ message: "Logged in successfully" });
        



    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

const handleLogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: "Logout failed" });

        res.clearCookie("connect.sid"); // Optional
        res.status(200).json({ message: "Logged out successfully" });
    });
};


module.exports = {
    handleRegister,
    handleLogin,
    handleLogout
}
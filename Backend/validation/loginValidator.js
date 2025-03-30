const { check } = require('express-validator');
const Users = require("../models/users");
const bcrypt = require("bcrypt");

const loginValidator = [
    check("userName")
        .notEmpty().withMessage("user Name is required")
        .custom(async (value) => {
            const user = await Users.findOne({ userName: value })
            if (!user) {
                throw new Error("Invalid user name or password")
            }
            return true;
        }),
    check("password")
        .notEmpty().withMessage("Enter the password")
        .custom(async (value, { req }) => {
            const user = await Users.findOne({ userName: req.body.userName })
            if (user) {
                const isMatched = await bcrypt.compare(value, user.password);
                if (!isMatched) {
                    throw new Error("Invalid user name or password");
                }
                return true;
            }
            return true;
        })
]

module.exports = { loginValidator }
const { check } = require('express-validator');
const Users = require("../models/users");
const leoProfanity = require('leo-profanity');

const registerValidator = [
  check("fullName")
    .notEmpty().withMessage("Full Name is required")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Full name contain Only letters and spaces allowed")
    .isLength({ min: 3 }).withMessage("Fullname must be at least 3 characters")
    .custom(value => {
      if (leoProfanity.check(value)) {
        throw new Error("Can't use bad words")
      }
      return true
    }),

  check("userName")
    .notEmpty().withMessage("User Name is required")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage(" User name contain Only letters, numbers, and underscores")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters")
    .custom(async (value) => {
      const isExist = await Users.exists({ userName: value });
      if (isExist) throw new Error("This username is already taken");
      return true;
    })
    .custom(value => {
      if (leoProfanity.check(value)) {
        throw new Error("Can't use bad words")
      }
      return true
    }),

  check("password")
    .notEmpty().withMessage("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must include lowercase, uppercase, and a number")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),

  check("confirmPassword")
    .notEmpty().withMessage("Confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

module.exports = { registerValidator };
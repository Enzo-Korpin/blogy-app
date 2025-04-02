const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blogy");

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true,
    },

    userName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
    
<<<<<<< HEAD
    pathAvatar: {
        type: String,
        default: "../../Images/avatars/default.png"
    },
=======
>>>>>>> d349323e6ed8007d6177e2985b1a4b8d88259499


},

    { timestamps: true });
const User = mongoose.model("User", userSchema);
module.exports = User;

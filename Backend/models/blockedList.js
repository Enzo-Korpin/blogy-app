const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blogy");

const blockedUserSchema = new mongoose.Schema({

    blocker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    blocked: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }

},

    { timestamps: true });
const blockedUser = mongoose.model("blockedUser", blockedUserSchema);
module.exports = blockedUser;

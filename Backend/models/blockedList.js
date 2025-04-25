const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/blogy");
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// For sessions:

const blockedUserSchema = new mongoose.Schema({

    blocker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    blocked: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }

},

    { timestamps: true });
const blockedUser = mongoose.model("blockedUser", blockedUserSchema);
module.exports = blockedUser;

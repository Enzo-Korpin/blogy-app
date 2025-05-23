const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/blogy");
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const weeklyPostSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    },
    selectedAt: {
        type: Date, default: Date.now
    }
});


const WeeklyPost = mongoose.model("WeeklyPost", weeklyPostSchema);
module.exports = WeeklyPost;


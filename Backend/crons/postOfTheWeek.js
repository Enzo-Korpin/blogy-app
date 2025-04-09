// cronJobs/postOfTheWeek.js
const cron = require('node-cron');
const Post = require('../models/posts');
const WeeklyPost = require('../models/weeklyPost');

// Runs every day at midnight
cron.schedule('0 0 * * 6', async () => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const post = await Post.aggregate([
            { $match: { createdAt: { $gte: oneWeekAgo } } },
            { $addFields: { likeCount: { $size: '$like' } } },
            { $sort: { likeCount: -1 } },
            { $limit: 1 }
        ]);

        const winnerPost = post[0];
        if (winnerPost) {
            await WeeklyPost.create({
                postId: winnerPost._id,
                selectedAt: new Date()
            });
            console.log(`[CRON] ✅ Blog of the Day saved: ${winnerPost.title}`);
        } else {
            console.log('[CRON] 😢 No qualifying post today.');
        }
    } catch (err) {
        console.error('[CRON] 💥 Failed to pick blog of the week:', err);
    }
});

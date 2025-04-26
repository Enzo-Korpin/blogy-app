const rateLimit = require('express-rate-limit');
let limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = limiter;
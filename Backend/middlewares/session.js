const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionMiddleware = session({
  secret: "mySuperSecretSessionKey123!",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/blogy",
    collectionName: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week

    httpOnly: true,
    secure: false 
  }
});

module.exports = sessionMiddleware;

//this is session.js

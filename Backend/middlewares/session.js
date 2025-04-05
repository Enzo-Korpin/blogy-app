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
<<<<<<< HEAD
    maxAge: 1000 * 60 * 1 * 0.4   , 
=======
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
>>>>>>> c9d1397e51a63c093c5469593a70d5c2007b7a4c

    httpOnly: true,
    secure: false 
  }
});

module.exports = sessionMiddleware;

//this is session.js

const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/blogy",
    collectionName: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 1 * 80 , 

    httpOnly: true,
    secure: false 
  }
});

module.exports = sessionMiddleware;

//this is session.js

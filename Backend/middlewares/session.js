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
    maxAge: 1000 * 60 * 1 * 20 , 

=======
    maxAge: 1000 * 60 * 1 * 60, // 1 hour
>>>>>>> 9068e72c50b37f9cf006d58b127d54b7c5a806e1
    httpOnly: true,
    secure: false 
  }
});

module.exports = sessionMiddleware;

//this is session.js

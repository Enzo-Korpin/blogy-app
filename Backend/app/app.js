const usersRoute = require("../routes/usersRoutes.js");
const postRoute = require("../routes/postRoutes.js");
const commentRoute = require("../routes/commentRoutes.js")
const adminRoute = require("../routes/adminRoutes.js")
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const express = require("express");
const app = express();
require('../crons/postOfTheWeek.js');
const sessionMiddleware = require("../middlewares/session.js");
const path = require("path");
const bodyParser = require("body-parser");
const checkSession = require("../middlewares/checkSession.js");
const port = 8080;


app.use(express.static(path.join(__dirname, "../../Frontend")));

app.use("/Images", express.static(path.join(__dirname, "../../Images")));






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(checkSession)
app.use("/users", usersRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/admin", adminRoute);




app.listen(port, () => {
  console.log("app is running `http://localhost:8080`");
});

//this is app.js
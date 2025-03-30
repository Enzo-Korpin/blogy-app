
const usersRoute = require("../routes/usersRoutes.js");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const sessionMiddleware = require("../middlewares/session.js");

const path = require("path");


app.use(express.static(path.join(__dirname, "../../Frontend")));
app.use("/Images", express.static(path.join(__dirname, "../../Images")));


const bodyParser = require("body-parser");
const port = 8080;
mongoose.connect("mongodb://127.0.0.1:27017/blogy")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);


app.use("/users", usersRoute);




app.listen(port, () => {
  console.log("app is running `http://localhost:8080`");
});

//this is app.js
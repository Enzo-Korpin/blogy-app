const usersRoute = require("../routes/usersRoutes.js");
const postRoute = require("../routes/postRoutes.js");
const express = require("express");
const app = express();

const sessionMiddleware = require("../middlewares/session.js");
const path = require("path");
const bodyParser = require("body-parser");
const checkSession = require("../middlewares/checkSession.js");
const port = 8080;


app.use(express.static(path.join(__dirname, "../../Frontend")));

app.use("/Images", express.static(path.join(__dirname, "../../Images")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(checkSession)
app.use("/users", usersRoute);
app.use("/posts", postRoute);




app.listen(port, () => {
  console.log("app is running `http://localhost:8080`");
});

//this is app.js
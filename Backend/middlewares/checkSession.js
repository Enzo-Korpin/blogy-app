
const User = require("../models/users.js");
const checkSession = async (req, res, next) => {
  const publicRoutes = [
    "/users/login",
    "/users/register",
    "/users/logout",
    "/users/login?expired=true",
  ];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  if (!req.session || !req.session.userId) {
    return res.redirect("/users/logout");
  }

  if (req.path.startsWith("/admin")) {
    const user = await User.findById(req.session.userId);
    if (!user || !user.isAdmin) { 
      return res.status(403).send("Access Denied.");
    }
  }

  return next();
};

module.exports = checkSession;

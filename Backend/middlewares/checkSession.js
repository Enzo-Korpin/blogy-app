const checkSession = (req, res, next) => {
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

  // if (req.path.startsWith("/admin")) {
  //   if (!req.session.isAdmin) {

  //     return res.status(403).send("Access Denied.");
  //   }
  // }

  return next();
};

module.exports = checkSession
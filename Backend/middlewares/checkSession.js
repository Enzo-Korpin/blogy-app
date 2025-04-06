const checkSession = (req, res, next) => {
  const publicRoutes = [
    "/users/login",
    "/users/register",
    "/users/logout",
    "/users/login?expired=true",
  ]
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  if (req.session && req.session.userId) {
    return next();
  }
  return res.redirect("/users/logout");
}

module.exports = checkSession;
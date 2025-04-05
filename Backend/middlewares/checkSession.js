const checkSession = (req, res, next) => {
    const publicRoutes = [
        "/users/login",
        "/users/register",
        "/users/logout",
        "/users/login?expired=true",
        "/posts/create",
        "/posts/posts",
    ]
    if (
        publicRoutes.includes(req.path) ||
        /^\/posts\/posts\/[0-9a-fA-F]{24}$/.test(req.path)
      ) {
        return next();
      }
    if (req.session && req.session.userId) {
        return next();
    }
    return res.redirect("/users/logout");
}

module.exports = checkSession;
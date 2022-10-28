const checkAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
}

// Add a checkPermissions helper...

module.exports = checkAuth;
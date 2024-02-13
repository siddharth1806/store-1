const passport = require('passport');

export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/'); 
        });
    })(req, res, next);
};

export const logout = (req, res) => {
    req.logout();
    res.redirect('/login'); 
};

const jwt = require('jsonwebtoken');

exports.loginRequired = async function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let payload = await jwt.verify(token, process.env.SECRET_KEY);
        if(payload) {
            return next();
        } else {
            return next({
                status: 401,
                message: "Please log in first"
            });
        }
    } catch (err) {
        return next({
            status: 401,
            message: "Please log in first"
        });
    }
};
const db = require('../models');

exports.messageOwnership = async function(req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id).populate("user", {
            id: true
        });
        if(foundMessage.user.id === req.params.id) {
            return next();
        } else {
            return next({
                status: 401,
                message: "You don't have permission to do that"
            });
        }
    } catch (err) {
        return next({
            status: 401,
            message: "You don't have permission to do that"
        });
    }
};
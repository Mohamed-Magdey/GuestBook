const db = require('../models');

exports.replyOwnership = async function(req, res, next) {
    try {
        let foundReply = await db.Reply.findById(req.params.reply_id).populate("user", {
            id: true
        });
        if(foundReply.user.id === req.params.id) {
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
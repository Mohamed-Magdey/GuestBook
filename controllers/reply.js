const db = require('../models');

exports.createReply = async function(req, res, next) {
    try {
        let reply = await db.Reply.create({
            reply: req.body.reply,
            user: req.params.id,
            message: req.params.message_id
        });

        // save reply in user
        let foundUser = await db.User.findById(req.params.id);
        foundUser.replies.push(reply.id);
        await foundUser.save();
        // save reply in message
        let foundMessage = await db.Message.findById(req.params.message_id);
        foundMessage.replies.push(reply.id);
        await foundMessage.save();
        // return reply with populated (username)
        let foundReply = await db.Reply.findById(reply._id).populate('user', {
            username: true
        });
        return res.status(201).json(foundReply);
    } catch(err) {
        return next(err);
    }
};
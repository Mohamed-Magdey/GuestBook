const db = require('../models');

exports.createMessage = async function(req, res, next) {
    try{
        let message = await db.Message.create({
            message: req.body.message,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message._id).populate('user', {
            username: true
        });
        return res.status(201).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

exports.getMessage = async function(req, res, next) {
  try {
      let message = await db.Message.findById(req.params.message_id);
      return res.status(200).json(message);
  } catch (err) {
      next(err);
  }
};

exports.updateMessage = async function(req, res, next) {
    try {
        let updatedMessage = await db.Message.updateOne({_id: req.params.message_id}, {
            message: req.body.message
        });
        return res.status(200).json(updatedMessage);
    } catch (err) {
        next(err);
    }
};

exports.deleteMessage = async function (req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};
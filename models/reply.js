const mongoose = require('mongoose'),
      User = require('./user'),
      Message = require('./message');

const replySchema = mongoose.Schema({
    reply: {
        type: String,
        required: true,
        maxLength: 180
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
}, {
    timestamps: true
});

replySchema.pre('remove', async function(next) {
    try {
        let user = await User.findById(this.user);
        user.replies.remove(this.id);
        await user.save();
        let message = await Message.findById(this.message);
        message.replies.remove(this.id);
        await message.save();
        return next();
    } catch(err) {
        return next(err);
    }
});

let Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
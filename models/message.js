const mongoose = require('mongoose'),
      User = require('./user');

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
        maxLength: 180
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

messageSchema.pre('remove', async function(next) {
    try {
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await user.save();
        return next();
    } catch(err) {
        return next(err);
    }
});

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;
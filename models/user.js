const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
});

userSchema.pre('save', async function(next) {
    try {
        if(!this.isModified('password')) {
            return next();
        } else {
            this.password = await bcrypt.hash(this.password, 10);
            return next();
        }
    } catch(err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(userPass, next) {
    try{
        return await bcrypt.compare(userPass, this.password);
    } catch(err) {
        return next()
    }
};

let User = mongoose.model("User", userSchema);

module.exports = User;
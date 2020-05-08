const jwt = require('jsonwebtoken'),
      db  = require('../models');

exports.signup = async function(req, res, next) {
    try{
        let user = await db.User.create(req.body);
        let {id, username} = user;
        let token = jwt.sign({
            id,
            username
        }, process.env.SECRET_KEY);
        return res.status(201).json({
            id,
            username,
            token
        })
    } catch(err) {
        if(err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}
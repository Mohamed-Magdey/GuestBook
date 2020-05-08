const express = require('express'),
      router = express.Router({mergeParams: true}),
      {createMessage, getMessage, deleteMessage} = require('../controllers/messages');

router
    .route('/')
    .post(createMessage);

router
    .route('/:message_id')
    .get(getMessage)
    .delete(deleteMessage);

module.exports = router;
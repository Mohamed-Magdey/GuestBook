const express = require('express'),
      router = express.Router({mergeParams: true}),
      {createMessage, getMessage, updateMessage, deleteMessage} = require('../controllers/messages');

router
    .route('/')
    .post(createMessage);

router
    .route('/:message_id')
    .get(getMessage)
    .put(updateMessage)
    .delete(deleteMessage);

module.exports = router;
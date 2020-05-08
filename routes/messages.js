const express = require('express'),
      router = express.Router({mergeParams: true}),
      {messageOwnership} = require('../middleware/messages'),
      {createMessage, getMessage, updateMessage, deleteMessage} = require('../controllers/messages');

router
    .route('/')
    .post(createMessage);

router
    .route('/:message_id')
    .get(getMessage)
    .put(messageOwnership, updateMessage)
    .delete(messageOwnership, deleteMessage);

module.exports = router;
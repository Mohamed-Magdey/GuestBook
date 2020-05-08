const express = require('express'),
      router = express.Router({mergeParams: true}),
      {createMessage, getMessage} = require('../controllers/messages');

router
    .route('/')
    .post(createMessage);

router
    .route('/:message_id')
    .get(getMessage);

module.exports = router;
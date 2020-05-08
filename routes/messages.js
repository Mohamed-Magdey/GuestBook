const express = require('express'),
      router = express.Router({mergeParams: true}),
      {createMessage} = require('../controllers/messages');

router
    .route('/')
    .post(createMessage);

module.exports = router;
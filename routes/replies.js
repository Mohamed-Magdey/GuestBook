const express = require('express'),
      router = express.Router({mergeParams: true}),
      {createReply} =require('../controllers/reply');

router
    .route('/')
    .post(createReply);

module.exports = router;
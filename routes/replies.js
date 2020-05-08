const express = require('express'),
      router = express.Router({mergeParams: true}),
      {replyOwnership} = require('../middleware/reply'),
      {createReply, deleteReply} =require('../controllers/reply');

router
    .route('/')
    .post(createReply);

router
    .route('/:reply_id')
    .delete(replyOwnership, deleteReply);

module.exports = router;
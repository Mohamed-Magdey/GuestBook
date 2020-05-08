const express = require('express'),
      router = express.Router({mergeParams: true}),
      {createReply, deleteReply} =require('../controllers/reply');

router
    .route('/')
    .post(createReply);

router
    .route('/:reply_id')
    .delete(deleteReply);

module.exports = router;
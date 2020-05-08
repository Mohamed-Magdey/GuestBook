const express = require('express'),
      router = express.Router(),
      {signup} = require('../controllers/auth');

router.post('/signup', signup);

module.exports = router;
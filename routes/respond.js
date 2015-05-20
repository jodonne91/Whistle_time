var express = require('express');
var router = express.Router();

/* GET respond listing. */
router.get('/', function(req, res, next) {
  res.render('respond', { heading: 'Select times that you will be available' });
});

module.exports = router;

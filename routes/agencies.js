var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Agency = mongoose.model('Agency');

/* GET agencies */
router.get('/', function(req, res, next) {
  Agency.find((err, agencies) => {
    res.json(agencies);
  });
});

module.exports = router;
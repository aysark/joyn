var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

/* GET a customer by full name */
router.get('/search/:name', function(req, res, next) {
  Customer.findOne({name: new RegExp('^'+req.params.name, "i")}, (err, customer, msg) => {
    if (err) {
      if (err.name === 'CastError') {
        res.status(400);
        return res.render('error', { error: err });
      }
      res.status(500);
      return res.render('error', { error: err });
    }
    res.json(customer);
  });
});

/* CREATE a customer */
router.post('/', function(req, res, next) {
  console.info('body', req.body);
  var customer = new Customer(req.body);
  customer.save((err, result) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(400);
        return res.render('error', { error: err });
      }
      res.status(500);
      return res.render('error', { error: err });
    }
    res.json(result);
  });
});

/* UPDATE a customer */
router.put('/:id', function(req, res, next) {
  Customer.update({_id: req.params.id}, {$set: req.body}, (err, result) => {
    if (err) {
      if (err.name === 'CastError') {
        res.status(400);
        return res.render('error', { error: err });
      }
      res.status(500);
      return res.render('error', { error: err });
    }
    if (result.n === 0) {
      res.status(404);
      return res.render('error', { error: 'Not found' });
    }
    res.json(result);
  });

});

/* GET a customer */
router.get('/:id', function(req, res, next) {
  Customer.findById(req.params.id, (err, customer, msg) => {
    if (err) {
      if (err.name === 'CastError') {
        res.status(400);
        return res.render('error', { error: err });
      }
      res.status(500);
      return res.render('error', { error: err });
    }
    res.json(customer);
  });
});

/* DELETE a customer */
router.delete('/:id', function(req, res, next) {
  Customer.remove({_id: req.params.id}, (err, result) => {
    if (err) {
      if (err.name === 'CastError') {
        res.status(400);
        return res.render('error', { error: err });
      }
      res.status(500);
      return res.render('error', { error: err });
    }
    
    if (result.n === 0) {
      res.status(404);
      return res.render('error', { error: 'Not found' });
    }
    res.json(result);
  });
});

/* GET customers */
router.get('/', function(req, res, next) {
  Customer.find((err, customers) => {
    res.json(customers);
  });
});

module.exports = router;

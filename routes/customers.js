var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Parse = require('parse/node');
var twilio = require('twilio');
var client = new twilio.RestClient('AC8e4380263b580396ca81dd4fd20f6e69', '0a654febbbe7f022b34b33d80a4a38df');

/* GET a customer by full name */
router.get('/search', function(req, res, next) {
  Customer.find({name: new RegExp('^'+req.query.name, "i")}, (err, customer, msg) => {
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

    Parse.initialize("YGMVB63cSq2DGVPRQFpKiU5fI7NrwaWcUkWMDKVt", 
      "l0qk5gPw91pBrbGpGDBAkGJUSeH46QpFnHVhKjN1", 
      "6zbAjz3cKKXagyxgclmcFRcOCRdjNfomqEOrYEWV");

    var rand = getRandomInt(0, 2);
    var message = "";
    switch (rand) {
      case 0:
        message = "Health services requested from St Partick Center."
        break;
      case 1:
        message = "Job training requested from St. Francis Community Services."
        break;
      case 2:
        message = "Housing services requested from Humanitri."
    }

    Parse.Push.send({
          badge: 1,
          channels: ['global'],
          data: {
            alert: message
          }
        }, {
          success: function() {
            console.log("Sent push notification.");
          },
          error: function(error) {
            console.log("Error sending push notification", error);
          }
        });
     
    // Pass in parameters to the REST API using an object literal notation. The
    // REST client will handle authentication and response serialzation for you.
    client.sms.messages.create({
        to:'+19136532897',
        from:'+18166562627',
        body: message
    }, function(error, message) {
        if (!error) {
          console.log('Success! The SID for this SMS message is:', message.sid);
        } 
      else {
          console.log('Oops! There was an error.', error);
        }
    });

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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = router;

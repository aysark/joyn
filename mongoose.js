var mongoose = require('mongoose');
var glob = require('glob');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/gdb', function(err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

mongoose.connection.on('connected', function() {
    console.log('Mongo Database connected');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongo Database disconnected');
});

// If the node process ends, close the mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongo Database disconnected through app termination');
        process.exit(0);
    });
});
process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log('Mongo Database disconnected through app termination');
        process.exit(0);
    });
});

var models = glob.sync('./models/*.js');
models.forEach(function(model) {
  require(model);
});

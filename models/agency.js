var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgencySchema = new Schema({
  name: {
      type: String,
      trim: true,
      default: undefined,
      index: true,
      required: 'Please provide a name'
  },
  address: {
      type: String,
      trim: true,
      default: undefined
  },
  phone: {
    type: String,
    default: "+13016053128",
  },
  isHealthProvider: {
    type: Boolean,
    default: false
  },
  isHousingProvider: {
    type: Boolean,
    default: true
  },
  updated: {
      type: Date,
      default: Date.now
  },
  created: {
      type: Date,
      default: Date.now
  }
});

mongoose.model('Agency', AgencySchema);

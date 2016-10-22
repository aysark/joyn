var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  agency: {
    type: Array
  },
  name: {
      type: String,
      trim: true,
      default: undefined,
      index: true,
      required: 'Please provide a name'
  },
  gender: {
      type: String,
      trim: true,
      default: undefined
  },
  address: {
      type: String,
      trim: true,
      default: undefined
  },
  isHomeless: {
    type: Boolean,
    default: true,
  },
  phone: {
      type: String,
      trim: true,
      default: undefined
  },
  dob: {
      type: Date,
      default: undefined,
  },
  ssn: {
      type: String,
      trim: true,
      default: undefined,
      // unique: true,
  },
  race: {
      type: String,
      trim: true,
      default: undefined
  },
  language: {
      type: String,
      trim: true,
      lowercase: true,
      default: undefined
  },
  emergencyContact: {
      type: String,
      trim: true,
      default: undefined
  },
  veteran: {
      type: Boolean,
      trim: true,
      default: undefined
  },
  housingVoucher: {
      type: String,
      trim: true,
      default: undefined
  },
  employmentStatus: {
      type: Boolean,
      trim: true,
      default: undefined
  },
  income: {
      type: Number,
      trim: true,
      default: undefined
  },
  insurance: {
      type: String,
      trim: true,
      default: undefined
  },
  history: {
      type: String,
      trim: true,
      default: undefined
  },
  housingRequests: {
      type: Array,
      default: undefined
  },
  medicalRequests: {
      type: Array,
      default: undefined
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

mongoose.model('Customer', CustomerSchema);

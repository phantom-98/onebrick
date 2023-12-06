const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  fullName: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  pan: {
    type: String
  },
  aadhaar: {
    type: String
  },
  address: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  pin: {
    type: String
  }
})

module.exports = mongoose.model('donor', DonorSchema);
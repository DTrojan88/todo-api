var mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/@/, 'Invalid email address']
  }
});

module.exports = {User};

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 20,
    max: 80
  },
  role: {
    type: String,
    enum: ['admin', 'guess'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  avatarUrl: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=Unk'
  },
  skills: [{
    type: String,
    enum: ['js', 'html', 'css', 'scala', 'java', 'node', 'express', 'mongo']
  }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;

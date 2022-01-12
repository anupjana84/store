const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is field required'],
    maxlength: [40, 'Name should be under 40 character'],
  },
  email: {
    type: String,
    required: [true, 'Email is Field Required'],
    validate: [validator.isEmail, 'Email type right format'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is Required '],
    minlength: [6, 'Name should be geterthan 6 character'],
    maxlength: [10, 'Name should be under 10 character'],
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  photo: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', userSchema)

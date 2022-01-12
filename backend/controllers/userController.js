const cloudinary = require('cloudinary')
const bcrypt = require('bcryptjs')
const BigPromise = require('../middlewares/bigPromise')
const User = require('../models/user')
const CustomError = require('../utils/customError')

exports.register = BigPromise(async (req, res, next) => {
  console.log(req)
  if (!req.files) {
    return next(new CustomError('photo is required for signup', 400))
  }

  const { name, email, password } = req.body

  if (!email || !name || !password) {
    return next(new CustomError('Name, email and password are required', 400))
  }
  const oneuser = await User.findOne({ email: email })
  if (oneuser) {
    return next(new CustomError('Email Already Register', 400))
  } else {
    let file = req.files.photo

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'users',
      width: 300,
      crop: 'scale',
    })

    const user = await User.create({
      name,
      email,
      password,
      photo: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
    })
    if (user) {
      res.status(200).json({
        succes: true,
        message: 'Register',
      })
    }
  }
})

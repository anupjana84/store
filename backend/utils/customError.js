class CustomError extends Error {
  constructor(message, code) {
    super(message)
    this.code = code
    this.isOparational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = CustomError

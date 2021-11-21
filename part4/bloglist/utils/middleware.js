const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint"})
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message})
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
  }
  
  next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }
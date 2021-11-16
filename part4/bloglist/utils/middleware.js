const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint"})
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message})
  }

  next(error)
}

module.exports = { unknownEndpoint, errorHandler }
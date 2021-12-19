import React from 'react'

const Message = ({ message, type }) => {
  if (type === null) {
    return null
  }

  const className = `message ${type}`

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Message
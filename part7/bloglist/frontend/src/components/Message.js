import React from 'react'

const Message = ({ text, type }) => {
  if (type === null) {
    return null
  }

  const className = `message ${type}`

  return (
    <div className={className}>
      {text}
    </div>
  )
}

export default Message
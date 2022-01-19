import React from 'react'

const Notification = ({ message }) => {
  return (
    <div>
      {message !== null 
      ? <div>{message}</div>
      : <div></div>}
    </div>
  )
}

export default Notification
import React from "react"

const Message = ({ type, message }) => {
  if (type === null) {
    return null
  } else if (type === "success") {
    return (
      <div className="message success">{message}</div>
    )
  } else {
    return (
      <div className="message failure">{message}</div>
    )
  } 
}

export default Message
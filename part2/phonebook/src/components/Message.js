import React from "react"

const Message = ({ type, message }) => {
  if (type === null) {
    return null
  } else if (type === "success") {
    return (
      <div className="message success">{message}</div>
    )
  }
}

export default Message
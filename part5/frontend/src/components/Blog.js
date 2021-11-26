import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)
  const text = () => visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{text()}</button>
      </div>
      
      {visible ?
      <div>
        {blog.url} <br />
        likes {blog.likes} <button>likes</button> <br />
        {blog.user?.name} <br />
      </div> : <div></div>
      }
    </div>
  )
}

export default Blog
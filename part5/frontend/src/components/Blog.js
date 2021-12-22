import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
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

  const updatedLikes = { ...blog, likes: blog.likes + 1 }

  const addLike = event => {
    event.preventDefault()
    updateBlog(updatedLikes, blog.id)
  }

  const deleteBlog = event => {
    event.preventDefault()
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div className="basicinfo">
        <span>{blog.title} {blog.author}</span> <button onClick={toggleVisibility}>{text()}</button>
      </div>

      {visible ?
        <div className="extrainfo">
          {blog.url} <br />
          likes {blog.likes} <button className="like-button" onClick={addLike}>like</button> <br />
          {blog.user.name} <br />
          {blog.user.username === currentUser.username ? <button onClick={deleteBlog}>remove</button> : null}
        </div> :
        null
      }
    </div>
  )
}

export default Blog
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editBlog, deleteBlog } from '../reducers/blogReducer'
import { showMessage } from '../reducers/messageReducer'

const Blog = ({ blog, currentUser }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => setVisible(!visible)
  const text = () => visible ? 'hide' : 'view'
  const updatedBlog = { ...blog, likes: blog.likes + 1 }

  const addLike = event => {
    event.preventDefault()
    try {
      const newBlog = { ...updatedBlog, user: updatedBlog.user.id }
      dispatch(editBlog(newBlog, updatedBlog.id))
    } catch (exception) {
      console.error(exception)
      dispatch(showMessage('FAILURE', 'Updating a blog failed'))
    }
  }

  const removeBlog = event => {
    event.preventDefault()
    if (window.confirm(`Do you want to delete "${blog.title}" by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (exception) {
        console.error(exception)
        dispatch(showMessage('FAILURE', 'This user is not allowed to delete this blog'))
      }
    }
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
          {blog.user.username === currentUser.username ? <button className="remove-button" onClick={removeBlog}>remove</button> : null}
        </div> :
        null
      }
    </div>
  )
}

export default Blog
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, addBlog, editBlog, deleteBlog } from './reducers/blogReducer'
import { showMessage } from './reducers/messageReducer'
import { userLogin, userLogout } from './reducers/userReducer'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Login from './components/Login'
import Logout from './components/Logout'
import Message from './components/Message'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const { blogs: stateBlogs, message: stateMessage, user: stateUser } = useSelector(state => state)
  const createFormRef = useRef()

  const sortByLikes = arr => arr.sort((first, second) => second.likes - first.likes)
  sortByLikes(stateBlogs)

  // Fetch blogs and then user credentials
  useEffect(() => dispatch(initBlogs()), [dispatch])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userLogin(user))
      blogService.setToken(user.token)
      console.log('Logged in already')
    } else {
      dispatch(userLogout())
      console.log('Logged out')
    }
  }, [])

  const createBlog = async credentials => {
    const { title, author } = credentials
    try {
      dispatch(addBlog(credentials))
      showMessage('SUCCESS', `A new blog "${title}" by ${author} was created`)
      createFormRef.current.toggleVisibility()
    } catch (exception) {
      console.error(exception)
      showMessage('FAILURE', 'Creating a blog failed')
    }
  }

  const updateBlog = async blog => {
    try {
      const newBlog = { ...blog, user: blog.user.id }
      dispatch(editBlog(newBlog, blog.id))
    } catch (exception) {
      console.error(exception)
      showMessage('FAILURE', 'Updating a blog failed')
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Do you want to delete "${blog.title}" by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (exception) {
        console.error(exception)
        showMessage('FAILURE', 'This user is not allowed to delete this blog')
      }
    }
  }

  return (
    <div>
      <Message text={stateMessage.text} type={stateMessage.type} />

      {stateUser === null ?
        <Login /> :
        <div>
          <h2>Blogs</h2>

          {stateUser.name} logged in
          <Logout />

          <Togglable buttonLabel="Create new blog" ref={createFormRef}>
            <CreateForm createBlog={createBlog} />
          </Togglable>

          <div>
            {stateBlogs.map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} currentUser={stateUser} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App
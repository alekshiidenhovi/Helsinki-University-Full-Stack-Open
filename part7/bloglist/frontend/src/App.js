import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, addBlog, editBlog, deleteBlog } from './reducers/blogReducer'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Login from './components/Login'
import Logout from './components/Logout'
import Message from './components/Message'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const sortByLikes = arr => arr.sort((first, second) => second.likes - first.likes)

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  sortByLikes(blogs)

  const [message, setMessage] = useState('')
  const [type, setType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const createFormRef = useRef()

  // Fetch blogs
  // useEffect(() => blogService.getAll().then(blogs => {
  //   sortByLikes(blogs)
  //   setBlogs(blogs)
  // }), [])
  useEffect(() => dispatch(initBlogs()), [dispatch])

  // Fetch user credentials
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (type, message) => {
    if (type !== null) {
      setMessage(message)
      setType(type)
      setTimeout(() => setType(null), 5000)
    }
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const credentials = { username, password }
      const newUser = await loginService.login(credentials)

      window.localStorage.setItem('loggedUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
      setUsername('')
      setPassword('')
      showMessage('success', `${newUser.name} logged in`)
    } catch (exception) {
      console.error(exception)
      showMessage('failure', 'Wrong username or password')
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
      showMessage('success', 'Logout successful')
    } catch (exception) {
      console.error(exception)
      showMessage('failure', 'Logout failed')
    }
  }

  const createBlog = async credentials => {
    const { title, author } = credentials
    try {
      dispatch(addBlog(credentials))
      showMessage('success', `A new blog "${title}" by ${author} was created`)
      createFormRef.current.toggleVisibility()
    } catch (exception) {
      console.error(exception)
      showMessage('failure', 'Creating a blog failed')
    }
  }

  const updateBlog = async blog => {
    try {
      const newBlog = { ...blog, user: blog.user.id }
      dispatch(editBlog(newBlog, blog.id))
    } catch (exception) {
      console.error(exception)
      showMessage('failure', 'Updating a blog failed')
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Do you want to delete "${blog.title}" by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (exception) {
        console.error(exception)
        showMessage('failure', 'This user is not allowed to delete this blog')
      }
    }
  }

  return (
    <div>
      <Message message={message} type={type} />

      {user === null ?
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /> :
        <div>
          <h2>Blogs</h2>

          {user.name} logged in
          <Logout handleLogout={handleLogout} />

          <Togglable buttonLabel="Create new blog" ref={createFormRef}>
            <CreateForm createBlog={createBlog} />
          </Togglable>

          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} currentUser={user} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Login from './components/Login'
import Logout from './components/Logout'
import Message from './components/Message'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const createFormRef = useRef()

  const sortByLikes = arr => arr.sort((first, second) => second.likes - first.likes)
  
  // Fetch blogs
  useEffect(() => blogService.getAll().then(blogs => {
    sortByLikes(blogs)
    setBlogs(blogs)
  }), [])

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
      const credentials = {username, password}
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
    const {title, author} = credentials
    try {
      const blog = await blogService.create(credentials)

      showMessage('success', `A new blog "${title}" by ${author} was created`)
      setBlogs(blogs.concat(blog))
      createFormRef.current.toggleVisibility()
    } catch (exception) {
      console.error(exception)
      showMessage('failure', 'Creating a blog failed')
    }
  }

  const updateBlog = async (blog, id) => {
    try {
      const newBlog = { 
        user: blog.user.id,
        likes: blog.likes, 
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      await blogService.update(newBlog, id)
      const updatedBlogs = blogs.map(b => b.id === id ? blog : b)
      sortByLikes(updatedBlogs)
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.error(exception)
      showMessage('failure', 'Updating a blog failed')
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
          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}
        </div>
      } 
    </div>
  )
}

export default App
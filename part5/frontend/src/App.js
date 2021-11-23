import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Login from './components/Login'
import Logout from './components/Logout'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  // Fetch blogs
  useEffect(() => blogService.getAll().then(blogs => setBlogs(blogs)), [])

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

  const handleCreate = async event => {
    event.preventDefault()
    try {
      const credentials = {title, author, url}
      const blog = await blogService.create(credentials)

      showMessage('success', `A new blog "${title}" by ${author} was created`)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.error(exception)
      showMessage('failure', 'Creating a blog failed')
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

          <p>{user.name} logged in</p>
          <Logout handleLogout={handleLogout} />

          <CreateForm
            handleCreate={handleCreate}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      } 
    </div>
  )
}

export default App
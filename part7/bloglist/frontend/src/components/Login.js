import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showMessage } from '../reducers/messageReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      setUsername('')
      setPassword('')
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const credentials = { username, password }
      const newUser = await loginService.login(credentials)
      dispatch(userLogin(newUser))

      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      dispatch(showMessage('SUCCESS', `${newUser.name} logged in`))
    } catch (exception) {
      console.error(exception)
      showMessage('FAILURE', 'Wrong username or password')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
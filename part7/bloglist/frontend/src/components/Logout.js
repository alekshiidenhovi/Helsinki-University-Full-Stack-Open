import React from 'react'
import { userLogout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { showMessage } from '../reducers/messageReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const handleLogout = event => {
    event.preventDefault()
    try {
      dispatch(userLogout())
      window.localStorage.removeItem('loggedUser')
      blogService.setToken(null)
      dispatch(showMessage('SUCCESS', 'Logout successful'))
    } catch (exception) {
      console.error(exception)
      dispatch(showMessage('FAILURE', 'Logout failed'))
    }
  }

  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default Logout
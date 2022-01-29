import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
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
  const createFormRef = useRef()
  const { blogs: stateBlogs, message: stateMessage, user: stateUser } = useSelector(state => state)

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

  const sortByLikes = arr => arr.sort((first, second) => second.likes - first.likes)
  sortByLikes(stateBlogs)

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
            <CreateForm formRef={createFormRef} />
          </Togglable>

          <div>
            {stateBlogs.map(blog =>
              <Blog key={blog.id} blog={blog} currentUser={stateUser} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App
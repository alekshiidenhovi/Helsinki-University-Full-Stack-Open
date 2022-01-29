import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showMessage } from '../reducers/messageReducer'
import { addBlog } from '../reducers/blogReducer'


const CreateForm = ({ formRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const createBlog = event => {
    event.preventDefault()
    const credentials = { title, author, url }

    try {
      dispatch(addBlog(credentials))
      dispatch(showMessage('SUCCESS', `A new blog "${title}" by ${author} was created`))
      formRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.error(exception)
      dispatch(showMessage('FAILURE', 'Creating a blog failed'))
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            id='title'
            type="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateForm
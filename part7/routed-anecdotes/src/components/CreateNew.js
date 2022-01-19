import React from 'react'
import { useField } from '../hooks/index'
import { useHistory } from 'react-router-dom'

const CreateNew = (props) => {
  const {reset: resetContent, ...content} = useField('content')
  const {reset: resetAuthor, ...author} = useField('author')
  const {reset: resetInfo, ...info} = useField('info')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  const resetAll = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={resetAll}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
import React from 'react'

const CreateForm = ({ handleCreate, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
} 

export default CreateForm
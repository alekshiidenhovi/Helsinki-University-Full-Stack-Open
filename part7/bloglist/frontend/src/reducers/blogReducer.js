import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'EDIT_BLOG':
    return state.map(blog => blog.id === action.data.blog.id ? { ...blog, likes: blog.likes + 1 } : blog)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = credentials => {
  return async dispatch => {
    const blog = await blogService.create(credentials)
    dispatch({
      type: 'ADD_BLOG',
      data: blog
    })
  }
}

export const editBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.update(newBlog)
    dispatch({
      type: 'EDIT_BLOG',
      data: { blog }
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export default blogReducer
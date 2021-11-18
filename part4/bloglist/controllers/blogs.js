const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0
  })

  if (blog.title || blog.url) {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.patch('/:id', async (request, response) => {
  const body = request.body

  if (!body.likes) response.status(400).end()

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter
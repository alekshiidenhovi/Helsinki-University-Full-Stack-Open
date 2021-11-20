const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const {body, token} = request
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    ...body,
    user: user._id,
    likes: body.likes || 0
  })

  if (blog.title || blog.url) {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await User.findByIdAndUpdate(user._id, user)
    response.status(201).json(savedBlog)
  } else {
    response.status(400).json({ error: "Title and url missing" })
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
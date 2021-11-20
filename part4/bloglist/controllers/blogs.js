const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

const checkToken = (token, user) => {
  if (!token || !user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const {body, token, user} = request
  const userId = user._id.toString()
  const blog = new Blog({
    ...body,
    user: userId,
    likes: body.likes || 0
  })

  checkToken(token, user)

  if (blog.title || blog.url) {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await User.findByIdAndUpdate(userId, user)

    response.status(201).json(savedBlog)
  } else {
    response.status(400).json({ error: "Title and url missing" })
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const {token, user} = request
  const userId = user._id.toString()
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  checkToken(token, user)

  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(blogId)

    user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
    await User.findByIdAndUpdate(userId, user)

    response.status(204).end()
  } else {
    response.status(401).json({ error: "This user cannot delete this blog" })
  }
})

blogRouter.patch('/:id', async (request, response) => {
  const body = request.body

  if (!body.likes) response.status(400).end()

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter
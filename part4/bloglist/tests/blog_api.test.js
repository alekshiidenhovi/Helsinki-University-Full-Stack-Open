const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const omit = require('lodash/omit')

// Initialize database
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogs.map(blog => blog.save())

  await Promise.all(promiseArray)
})

test('Blogs returned successfully as json', async () => {
  await api.get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('Correct amount of blogs returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Unique identifier is id instead of _id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).not.toBeDefined()
})

test('New blog is posted successfully', async () => {
  const newBlog = {
    title: "New blog",
    author: "New author",
    url: "www.newblog.com",
    likes: 2
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogsEnd = await helper.blogsInDb()
  const processedBlogs = blogsEnd.map(blog => omit(blog, ["id"]))

  expect(processedBlogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(processedBlogs).toContainEqual(newBlog)
})

afterAll(() => mongoose.connection.close())

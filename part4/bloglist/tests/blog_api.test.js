const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const omit = require('lodash/omit')

// Initialize database
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogs.map(blog => blog.save())

  await Promise.all(promiseArray)
})

describe('GET-request tests:', () => {
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
})

describe('POST-request tests:', () => {
  test('New blog is posted successfully', async () => {
    const newBlog = {
      title: "First blog",
      author: "First author",
      url: "www.firstblog.com",
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
  
  test('Likes default to zero', async () => {
    const newBlog = {
      title: "Second blog",
      author: "Second author",
      url: "www.secondblog.com"
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const blogsEnd = await helper.blogsInDb()
    const processedBlogs = blogsEnd.map(blog => omit(blog, ["id"]))
  
    expect(processedBlogs).toHaveLength(helper.initialBlogs.length + 1)
  
    expect(processedBlogs).not.toContainEqual(newBlog)
    newBlog.likes = 0
    expect(processedBlogs).toContainEqual(newBlog)
  })
  
  test('Returns status code 400 if POST-request is missing title and url properties', async () => {
    const firstBlog = { author: "Third author", likes: 4 }
    await api
    .post('/api/blogs')
    .send(firstBlog)
    .expect(400)
  
    const secondBlog = {...firstBlog, title: "Third blog"}
    await api
    .post('/api/blogs')
    .send(secondBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const thirdBlog = {...firstBlog, url: "www.thirdblog.com"}
    await api
    .post('/api/blogs')
    .send(thirdBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  })
})

describe('DELETE-request tests:', () => {
  test('Blog is deleted successfully', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    
    expect(blogsAtEnd).not.toContainEqual(blog)
  })
})

describe('PATCH-request tests:', () => {
  test('Blog is updated successfully', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const updatedLikes = 77
    const blog = {
      likes: updatedLikes,
    }

    await api
    .patch(`/api/blogs/${blogsAtStart[0].id}`)
    .send(blog)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(updatedLikes)
  })
})

describe('User-tests: when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', name: 'me', passwordHash })

    await user.save()
  })

  test('Creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'second',
      name: 'Second One',
      password: 'one',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  describe('Invalid usernames are not added to the database', () => {
    const userTest = async (user) => {
      const usersAtStart = await helper.usersInDb()
  
      await api
      .post('/api/users')
      .send(user)
      .expect(400)
  
      const usersAtEnd = await helper.usersInDb()
  
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
      expect(usersAtEnd).not.toContainEqual(user)
    }

    test('Username too short', async () => {
      const user = {
        username: "SU",
        name: "Short Username",
        password: "passwordlongenough"
      }
      await userTest(user)
    })
  
    test('Password too short', async () => {
      const user = {
        username: "tooshort",
        name: "Short Password",
        password: "sh"
      }
      await userTest(user)
    })
  
    test('Password missing', async () => {
      const user = {
        username: "missing",
        name: "Missing Password"
      }
      await userTest(user)
    })
  })
})

afterAll(() => mongoose.connection.close())

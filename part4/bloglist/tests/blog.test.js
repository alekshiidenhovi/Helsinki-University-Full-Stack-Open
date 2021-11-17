const listHelper = require('../utils/list_helper')
const omit = require('lodash/omit')
const helper = require('./test_helper')

const blogs = helper.initialBlogs
const oneBlog = blogs.slice(0, 1)
const firstBlogger = oneBlog[0]

test('Dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('Favorite blog', () => {
  const omittedFields = ['_id', '__v', 'url']

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('when list has only one blog, is the blog itself', () => {
    const favoriteBlog = omit(firstBlogger, omittedFields)
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual(favoriteBlog)
  })

  test('of a bigger list is calculated right', () => {
    const actualFavorite = omit(blogs[2], omittedFields)
    const result = listHelper.favoriteBlog(blogs)

    expect(result).toEqual(actualFavorite)
  })
})

describe('The author of most blogs', () => {
  const omittedFields = ['_id', 'title', 'url', 'likes', '__v']

  test('when list is empty is undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({ author: undefined, blogs: 0 })
  })

  test('when list has only one entry, is that author and one blog', () => {
    const result = listHelper.mostBlogs(oneBlog)
    const actual = omit(firstBlogger, omittedFields)
    actual.blogs = 1
    expect(result).toEqual(actual)
  })

  test('when list has multiple entries, correct object is returned', () => {
    const result = listHelper.mostBlogs(blogs)
    const actual = omit(blogs[4], omittedFields)
    actual.blogs = 3
    expect(result).toEqual(actual)
  })
})

describe('The author with most likes', () => {
  const omittedFields = ['_id', '__v', 'title', 'url']

  test('when list is empty is undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({ author: undefined, likes: 0 })
  })

  test('when list has only one entry, is the one author on the list and his likes', () => {
    const result = listHelper.mostLikes(oneBlog)
    const actual = omit(firstBlogger, omittedFields)
    actual.likes = firstBlogger.likes
    expect(result).toEqual(actual)
  })

  test('when there are multiple entries, is calculated correctly', () => {
    const result = listHelper.mostLikes(blogs)
    const actual = omit(blogs[1], omittedFields)
    actual.likes = 17
    expect(result).toEqual(actual)
  })
})

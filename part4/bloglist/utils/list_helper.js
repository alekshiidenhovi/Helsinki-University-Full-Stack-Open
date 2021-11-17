// const logger = require('./logger');

const dummy = blogs => 1

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  let maxLikes = -1
  let maxIdx = -1

  blogs.forEach((blog, i) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      maxIdx = i
    } 
  })

  const blog = blogs[maxIdx]
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const mostBlogs = blogs => {
  const blogAmount = new Map()

  blogs.forEach((blog) => {
    const author = blog.author
    if (blogAmount.has(author)) {
      blogAmount.set(author, blogAmount.get(author) + 1)
    } else {
      blogAmount.set(author, 1)
    }
  })

  let winningAuthor = undefined
  let mostBlogs = 0

  for (const [author, blogs] of blogAmount) {
    if (blogs >= mostBlogs) {
      winningAuthor = author
      mostBlogs = blogs
    } 
  }

  return { 
    author: winningAuthor, 
    blogs: mostBlogs 
  }
}

const mostLikes = blogs => {
  const likeAmount = new Map()

  blogs.forEach((blog) => {
    const author = blog.author
    if (likeAmount.has(author)) {
      likeAmount.set(author, likeAmount.get(author) + blog.likes)
    } else {
      likeAmount.set(author, blog.likes)
    }
  })

  let winningAuthor = undefined
  let mostLikes = 0

  for (const [author, likes] of likeAmount) {
    if (likes >= mostLikes) {
      winningAuthor = author
      mostLikes = likes
    } 
  }

  return { 
    author: winningAuthor, 
    likes: mostLikes
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
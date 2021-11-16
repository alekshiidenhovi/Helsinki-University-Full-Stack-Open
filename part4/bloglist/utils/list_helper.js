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

  return blogs[maxIdx]
}

module.exports = { dummy, totalLikes, favoriteBlog }
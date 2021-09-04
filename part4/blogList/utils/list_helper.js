const lodash = require('lodash')

const dummy = blogs => {
    return 1
  }
  
const totalLikes = blogs => {
    const likes = blogs.map(blog => {
        return blog.likes
    })
    return likes.reduce((sum, item) => {
        return sum + item
    }, 0)
}

const favoriteBlog = blogs => {
    const favorite = blogs.reduce((favorite, blog) => (favorite.likes > blog.likes) ? favorite : blog)
    delete favorite.url
    delete favorite.__v 
    delete favorite._id
    return favorite
}

  module.exports = {
    dummy, totalLikes, favoriteBlog
  }
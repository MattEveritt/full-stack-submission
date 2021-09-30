const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.post('/:id/comments', async (request, response) => {
  console.log('adding comment', request.body)
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment({content: body.comment})
  comment.blog = blog
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment)
})

blogsRouter.get('/', async (request, response) => {
   console.log('sending blogs')
   const blogs = await Blog.find({}).populate('user').populate('comments')
   response.json(blogs)
 })

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  console.log('posting new blog')
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog(body)
  blog.likes = blog.likes ? blog.likes : (blog.likes = 0)
  blog.user = user._id
  if (!blog.title || !blog.author) {
    response.status(400).json(blog)
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    console.log('deleting blog')
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = request.user

    if (!(request.token && decodedToken.id)) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else if (user.toString() !== decodedToken.id) {
      response.status(401).json({ error: 'token invalid' })
    } else if (user.toString() === decodedToken.id) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
  }
)

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  console.log('updating blog', request.body)
  const body = request.body
  const blog = new Blog({ ...body, user: body.user, comments: body.comments[0].id})
  console.log('blog1 ', blog)
  blog._id = request.params.id
  console.log('blog2 ', blog)
  await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(blog)
})

module.exports = blogsRouter

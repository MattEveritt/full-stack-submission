const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
 const blogs = await Blog.find({}).populate('user', { blogs: 0 })
 response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
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

blogsRouter.delete('/:id', async (request, response) => {
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
})

blogsRouter.put('/:id', async (request, response) => {
 const blog = new Blog(request.body)
 blog._id = request.params.id
 await Blog.findByIdAndUpdate(request.params.id, blog)
 response.json(blog)
})

module.exports = blogsRouter

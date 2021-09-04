const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
 {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
 },
 {
  title: 'Is it really harmful?',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 6,
 },
]

beforeEach(async () => {
 await Blog.deleteMany({})
 let blogObject = new Blog(initialBlogs[0])
 await blogObject.save()
 blogObject = new Blog(initialBlogs[1])
 await blogObject.save()

 await User.deleteMany({})

 await api.post('/api/users').send({
  blogs: [],
  username: 'Edgar',
  name: 'Edsger W. Dijkstra',
  password: 'EdgarPassword',
 })
})
test('there are two blogs', async () => {
 const loginResponse = await api.post('/api/login').send({
  username: 'Edgar',
  password: 'EdgarPassword',
 })
 const token = loginResponse.body.token
 const response = await api
  .get('/api/blogs')
  .set('Authorization', `bearer ${token}`)

 expect(response.body).toHaveLength(2)
})

test('unique identifier property is named id', async () => {
 const loginResponse = await api.post('/api/login').send({
  username: 'Edgar',
  password: 'EdgarPassword',
 })
 const token = loginResponse.body.token
 const response = await api
  .get('/api/blogs')
  .set('Authorization', `bearer ${token}`)

 expect(response.body[0].id).toBeDefined()
})

test('blog posted successfully', async () => {
 const newBlog = {
  title: 'Why?',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
 }

 const loginResponse = await api.post('/api/login').send({
  username: 'Edgar',
  password: 'EdgarPassword',
 })
 const token = loginResponse.body.token
 await api
  .post('/api/blogs')
  .set('Authorization', `bearer ${token}`)
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

 const response = await api
  .get('/api/blogs')
  .set('Authorization', `bearer ${token}`)

 expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('likes property default value zero', async () => {
 const newBlog = {
  title: 'Is it really harmful?',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
 }
 const loginResponse = await api.post('/api/login').send({
  username: 'Edgar',
  password: 'EdgarPassword',
 })
 const token = loginResponse.body.token
 await api
  .post('/api/blogs')
  .set('Authorization', `bearer ${token}`)
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

 const response = await api
  .get('/api/blogs/')
  .set('Authorization', `bearer ${token}`)

 expect(response.body[2].likes).toBe(0)
})

test('responds with code four hundred if no title and url', async () => {
 const newBlog = {
  author: 'Edsger W. Dijkstra',
 }
 const loginResponse = await api.post('/api/login').send({
  username: 'Edgar',
  password: 'EdgarPassword',
 })
 const token = loginResponse.body.token
 await api
  .post('/api/blogs')
  .set('Authorization', `bearer ${token}`)
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)

 const response = await api
  .get('/api/blogs')
  .set('Authorization', `bearer ${token}`)

 expect(response.body).toHaveLength(initialBlogs.length)
})
test('fails with code 401 unauthorized if token is not provided', async () => {
 const newBlog = {
  title: 'Why?',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
 }
 await api
  .post('/api/blogs')
  //.set("Authorization", `bearer ${token}`)
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)
})

afterAll(() => {
 mongoose.connection.close()
})

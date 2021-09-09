import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId, user)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
      setMessage(['blog deleted successfully', true])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('error')
      setMessage(['blog not deleted', false])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addLike = async (updatedBlogObject) => {
    try {
      const returnedBlog = await blogService.update(updatedBlogObject, user)

      setMessage([
        `blog ${returnedBlog.title} by ${returnedBlog.author} updated successfully`,
        true,
      ])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('error')
      setMessage(['blog not updated', false])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleAddBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject, user)
      setBlogs(blogs.concat(returnedBlog))
      setMessage([
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        true,
      ])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('error')
      setMessage(['blog not added', false])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error')
      setMessage(['wrong username or password', false])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div id="blog-page">
      <h2>blogs</h2>
      <Notification message={message} />
      {user.name} logged in
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      <h2>create new</h2>
      <AddBlogForm createBlog={handleAddBlog} />
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .reverse()
        .map((blog) => (
          <Blog
            user={user}
            key={blog.id}
            blog={blog}
            updatedBlog={addLike}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  )
}

export default App

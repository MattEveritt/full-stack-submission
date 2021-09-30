import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import blogService from '../services/blogs'
import {
  addBlogNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogReducer'

const AddBlogForm = () => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const removeNotification = () => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    try {
      const returnedBlog = await blogService.create(blogObject, user)
      dispatch(newBlog(returnedBlog))
      dispatch(
        addBlogNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          true
        )
      )
      removeNotification()
    } catch (exception) {
      console.log('error')
      dispatch(addBlogNotification('blog not added', false))
      removeNotification()
    }
  }

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  return (
    <div className="blogFormDiv">
      <div style={hideWhenVisible}>
        <Button variant='primary' id="open-form-button" onClick={() => setBlogFormVisible(true)}>
          create
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Form onSubmit={handleAddBlog}>
          <Form.Group>
            <Form.Label>title:</Form.Label>
            <Form.Control
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
            <Form.Label>author:</Form.Label>
            <Form.Control
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
            <Form.Label>url:</Form.Label>
            <Form.Control
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
            <Button
              variant="primary"
              id="create-button"
              type="submit"
              onClick={() => setBlogFormVisible(false)}
            >
              create
            </Button>
          </Form.Group>
        </Form>
        <Button variant='primary' onClick={() => setBlogFormVisible(false)}>cancel</Button>
      </div>
    </div>
  )
}

export default AddBlogForm

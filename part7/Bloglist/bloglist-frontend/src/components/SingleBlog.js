import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'
import {
  likeNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import { updateBlogs } from '../reducers/blogReducer'

const SingleBlog = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blog = blogs.find((blog) => blog.id === id)

  const removeNotification = () => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    const commentObject = {
      comment: comment,
    }
    setComment('')
    try {
      const returnedComment = await blogService.addComment(
        id,
        commentObject,
        user
      )
      const newBlog = {
        ...blog,
        comments: blog.comments.concat(returnedComment),
      }
      const newBlogs = blogs
        .filter((blog) => blog.id !== returnedComment.blog)
        .concat(newBlog)
      dispatch(updateBlogs(newBlogs))
      dispatch(
        likeNotification(`a new comment ${returnedComment.content} added`, true)
      )
      removeNotification()
    } catch (exception) {
      console.log('error ', exception)
      dispatch(likeNotification('blog not added', false))
      removeNotification()
    }
  }

  const addLike = async () => {
    const newLikes = blog.likes + 1
    const updatedBlog = { ...blog, likes: newLikes, user: blog.user.id }
    try {
      const returnedBlog = await blogService.update(updatedBlog, user)
      const newBlog = {
        ...returnedBlog,
        user: { ...users.find((user) => user.id === returnedBlog.user) },
        comments: updatedBlog.comments,
      }
      const newBlogs = blogs
        .filter((blog) => blog.id !== returnedBlog.id)
        .concat(newBlog)
      dispatch(updateBlogs(newBlogs))
      dispatch(
        likeNotification(
          `blog ${returnedBlog.title} by ${returnedBlog.author} updated successfully`,
          true
        )
      )
      removeNotification()
    } catch (exception) {
      console.log('error ', exception)
      dispatch(likeNotification('blog not updated', false))
      removeNotification()
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <Link to={blog.url}>{blog.url}</Link>
      </div>
      <div>
        {blog.likes}
        {' likes '}
        <Button variant='primary' id="like-button" onClick={addLike}>
          like
        </Button>
      </div>
      Added by {!blog.user ? 'user' : blog.user.name}
      <h3>Comments</h3>
      <Form onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Control
            id="comment"
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <Button variant='primary' id="add-comment-button" type="submit">
            add comment
          </Button>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleBlog

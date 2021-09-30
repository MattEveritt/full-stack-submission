import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearNotification,
  deleteNotification,
  likeNotification,
} from '../reducers/notificationReducer'
import { removeBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [blogInfoVisible, setBlogFormVisible] = useState(false)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const removeNotification = () => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId, user)
      const newBlogs = blogs.filter((blog) => blog.id !== blogId)
      dispatch(removeBlogs(newBlogs))
      dispatch(deleteNotification('blog deleted successfully', true))
      removeNotification()
    } catch (exception) {
      console.log('error', exception)
      dispatch(deleteNotification('blog not deleted', false))
      removeNotification()
    }
  }

  const addLike = async () => {
    const newLikes = blog.likes + 1
    const updatedBlog = {
      id: blog.id,
      user: blog.user.id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      const returnedBlog = await blogService.update(updatedBlog, user)

      dispatch(
        likeNotification(
          `blog ${returnedBlog.title} by ${returnedBlog.author} updated successfully`,
          true
        )
      )
      removeNotification()
    } catch (exception) {
      console.log('error')
      dispatch(likeNotification('blog not updated', false))
      removeNotification()
    }
  }
  const blogUserName = blog.user.name

  const infoDisplayStyleToggle = { display: blogInfoVisible ? '' : 'none' }

  const showRemoveButton = {
    display: blog.user === user.id ? '' : 'none',
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div id="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button
          id="view-button"
          onClick={() =>
            blogInfoVisible
              ? setBlogFormVisible(false)
              : setBlogFormVisible(true)
          }
        >
          {blogInfoVisible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={infoDisplayStyleToggle} className="togglableContent">
        {blog.url}
        <div>
          likes {blog.likes}
          <button id="like-button" onClick={addLike}>
            like
          </button>
          <div>{blogUserName}</div>
        </div>
        <div style={showRemoveButton}>
          <button id="remove-button" onClick={removeBlog}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog

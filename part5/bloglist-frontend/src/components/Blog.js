import React, { useState } from 'react'

const Blog = ({ blog, updatedBlog, deleteBlog, user }) => {
  const [blogInfoVisible, setBlogFormVisible] = useState(false)
  const blogUserName = blog.user.name

  const infoDisplayStyleToggle = { display: blogInfoVisible ? '' : 'none' }

  const showRemoveButton = { display: blog.user === user.id ? '' : 'none' }

  const addLike = () => {
    blog.likes = blog.likes + 1
    updatedBlog({
      id: blog.id,
      user: blog.user,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
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
          <button id="like-button" onClick={addLike}>like</button>
          <div>{blogUserName}</div>
        </div>
        <div style={showRemoveButton}>
          <button id="remove-button" onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog

import React, { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  const handleAddBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  return (
    <div className="blogFormDiv">
      <div style={hideWhenVisible}>
        <button id="open-form-button" onClick={() => setBlogFormVisible(true)}>create</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="create-button" type="submit" onClick={() => setBlogFormVisible(false)}>
            create
          </button>
        </form>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default AddBlogForm

import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UsersBlogsList = () => {
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector(state => state.users)
  const id = useParams().id

  const usersBlogs = blogs.filter((blog) => id === blog.user.id)

  if(!users.filter(user => user.id === id)[0]) {
    return null
  }

  const name = users.filter(user => user.id === id)[0].name

  return (
    <div>
      <h2>{name}</h2>
      added blogs
      {usersBlogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}

export default UsersBlogsList

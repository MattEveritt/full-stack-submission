import React, { useEffect } from 'react'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import blogService from './services/blogs'
import usersService from './services/users'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { Table } from 'react-bootstrap'

const App = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const Users = () => (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td>{''}</td>
            <td>blogs created</td>
          </tr>
          {state.users.map((user) => (
            <UserList key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  )

  const UserView = () => (
    <div>
      <User />
    </div>
  )

  const BlogView = () => (
    <div>
      <SingleBlog />
    </div>
  )

  const Home = () => (
    <div>
      <h2>create new</h2>
      <AddBlogForm />
      <BlogList />
    </div>
  )

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
    usersService.getAll().then((users) => dispatch(initializeUsers(users)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const locallyStoredUser = JSON.parse(loggedUserJSON)
      dispatch(loginUser(locallyStoredUser))
    }
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
    window.localStorage.clear()
  }

  if (state.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const padding = {
    padding: 5,
  }

  const navBar = {
    backgroundColor: '#D3D3D3',
  }

  return (
    <Router>
      <div id="blog-page" className='container'>
        <div style={navBar}>
          <Link style={padding} to="/blogs">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          {state.user.name} logged in
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
        </div>
        <h2>blogs</h2>
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <BlogView />
          </Route>
          <Route path="/users/:id">
            <UserView />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

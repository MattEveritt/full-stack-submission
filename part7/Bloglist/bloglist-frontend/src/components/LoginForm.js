import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import loginService from '../services/login'
import { Form, Button } from 'react-bootstrap'

import {
  clearNotification,
  loginNotification,
} from '../reducers/notificationReducer'

const LoginForm = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const dispatch = useDispatch()

  const removeNotification = () => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService
        .login({
          username,
          password,
        })
        .then(setUsername(''))
        .then(setPassword(''))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(loginUser(user))
    } catch (exception) {
      console.log('error')
      dispatch(loginNotification('wrong username or password', false))
      removeNotification()
    }
  }

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant='primary' type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm

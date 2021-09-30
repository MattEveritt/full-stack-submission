import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import commentsReducer from './reducers/commentsReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  user: loginReducer,
  users: usersReducer,
  comments: commentsReducer,
})

const store = createStore(reducer)

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)

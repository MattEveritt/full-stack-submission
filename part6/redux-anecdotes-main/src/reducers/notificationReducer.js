const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'VOTED':
      state = action.message
      return state
    case 'CLEAR_NOTIFICATION':
      state = null
      return state
    case 'SET_NOTIFICATION':
      state = action.message
      return state
    default:
      return state
  }
}

export const voteNotification = (anecdoteContent) => {
  return {
    type: 'VOTED',
    message: `You voted ${anecdoteContent}`,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

let timeOutId
export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({ type: 'SET_NOTIFICATION', message: content })
    if (timeOutId) {
      clearTimeout(timeOutId)
    }
    timeOutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationReducer

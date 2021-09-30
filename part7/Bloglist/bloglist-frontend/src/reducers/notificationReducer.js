const notificationReducer = (
  state = { message: null, success: null },
  action
) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return { message: action.message, success: action.success }
    case 'CLEAR_NOTIFICATION':
      return { message: null, success: null }
    default:
      return state
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export const deleteNotification = (message, success) => {
  return {
    type: 'NOTIFICATION',
    message: message,
    success: success,
  }
}

export const likeNotification = (message, success) => {
  return {
    type: 'NOTIFICATION',
    message: message,
    success: success,
  }
}

export const addBlogNotification = (message, success) => {
  return {
    type: 'NOTIFICATION',
    message: message,
    success: success,
  }
}

export const loginNotification = (message, success) => {
  return {
    type: 'NOTIFICATION',
    message: message,
    success: success,
  }
}

export default notificationReducer

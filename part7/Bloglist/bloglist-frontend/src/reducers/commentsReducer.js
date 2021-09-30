const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_COMMENT':
      return [...state, action.data]
    default:
      return state
  }
}

export const newComment = (newComment) => {
  return {
    type: 'NEW_COMMENT',
    data: newComment,
  }
}

export default commentsReducer

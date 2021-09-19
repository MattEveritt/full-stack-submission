const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
        state = action.data
      return state
    default:
      return state
  }
}

export const changeFilter = (content) => {
    return {
        type: 'UPDATE_FILTER',
        data: content,
    }
}

export default filterReducer

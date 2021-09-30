const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG':
      return action.data
    case 'UPDATE_BLOGS':
      return action.data
    default:
      return state
  }
}

export const updateBlogs = (newBlogs) => {
  return {
    type: 'UPDATE_BLOGS',
    data: newBlogs,
  }
}

export const newBlog = (newBlog) => {
  return {
    type: 'NEW_BLOG',
    data: newBlog,
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}

export const removeBlogs = (newBlogs) => {
  return {
    type: 'DELETE_BLOG',
    data: newBlogs,
  }
}

export default blogReducer

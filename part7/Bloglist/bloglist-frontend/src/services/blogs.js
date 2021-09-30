import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (updatedBlog, user) => {
  const token = `bearer ${user.token}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  )
  return response.data
}

const addComment = async (blogId, comment, user) => {
  const token = `bearer ${user.token}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    comment,
    config
  )
  return response.data
}

const getComments = async () => {
  const response = await axios.get(`${baseUrl}/comments`)
  return response.data
}

const create = async (newBlog, user) => {
  const token = `bearer ${user.token}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const remove = async (blogId, user) => {
  const token = `bearer ${user.token}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response
}

export default { getAll, update, create, remove, addComment, getComments }

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
// const config = { headers: { 'Authorization': token }}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = { headers: { 'Authorization': token }}
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog, id) => {
  const config = { headers: { 'Authorization': token }}
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const exports = { setToken, getAll, create, update }
export default exports
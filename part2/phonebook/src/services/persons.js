import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getData = request => {
  return request.then(response => response.data)
}

const get = () => {
  const request = axios.get(baseUrl)
  return getData(request)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return getData(request)
}

const functions = { get, create }
export default functions
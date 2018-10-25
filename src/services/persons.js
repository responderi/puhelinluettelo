import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatePerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatePerson)
    return request.then(response => response.data)
  }
  
export default { getPersons, create, remove, update }
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getCountry = (id) => {

  const request = axios.get(`${baseUrl}/${id}`)

  return request.then(response => response.data)
}

export default { getCountry }

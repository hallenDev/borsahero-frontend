import axios from 'axios'

axios.interceptors.response.use(
  response => response?.data,
  error => Promise.reject(error?.response ? error?.response : error),
)

const setAxiosHeaders = (baseURL = '', authToken = '') => {
  axios.defaults.baseURL = baseURL

  if (authToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAxiosHeaders

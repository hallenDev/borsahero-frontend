import axios from 'axios'
import { useEffect } from 'react'
import { getAuthToken } from 'services/storage.service';

export default function useAxiosConfig() {

  const accessToken = getAuthToken();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
    //   config.headers['Content-Type'] = 'application/json';
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`
      } else {
        delete axios.defaults.headers.authorization
      }

      return config
    })

    const responseInterceptor = axios.interceptors.response.use(
      response => {
        return response.data
      },
      error => {
        return Promise.reject(error?.response ? error?.response : error)
      },
    )

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [accessToken])
}

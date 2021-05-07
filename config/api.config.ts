import axios from 'axios'

const API = axios.create({
  baseURL: process.env.API_HOST,
  timeout: 60000, // 1 minute
})

export default API

import axios from 'axios'
import { BASE_API_URL } from '../config/env'

export const request = axios.create({
  baseURL: BASE_API_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
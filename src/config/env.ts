export const APP_Version = '1.0.2'

const judge_urls = [
  'http://152.136.97.99:2358',
  'http://175.24.164.112:2358',
  'http://150.158.142.244:2358',
]

export const BASE_API_URL = judge_urls[ Math.random()*judge_urls.length | 0]

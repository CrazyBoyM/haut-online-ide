export const APP_Version = '1.0.2'

const judge_urls = [
  'http://guxin.ip3x.com:2358',
  'http://zhenghang.ip3x.com:2358',
  'http://guoshun.ip3x.com:2358',
]

export const BASE_API_URL = judge_urls[ Math.random()*judge_urls.length | 0]

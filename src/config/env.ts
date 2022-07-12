export const APP_Version = '1.0.2'

const judge_urls = ['https://api-judge0.netfrp.com',]

export const BASE_API_URL = judge_urls[ Math.random()*judge_urls.length | 0]

import { Base64 } from 'js-base64';

import { request } from '../utils/request';


export const submitCode = ({ code = '', lang = 'c_cpp', input = '' }, callback: Function) => {

  let url = '/submissions?base64_encoded=true&wait=false'
  let langId = new Map([
    ['c_cpp', 53],
    ['csharp', 51],
    ['golang', 60],
    ['kotlin', 78],
    ['java', 62],
    ['javascript', 63],
    ['typescript', 74],
    ['python', 71],
    ['php', 68],
    ['lua', 64],
    ['sh', 46],
    ['r', 80],
    ['lisp', 55],
    ['haskell', 61],
    ['assembly_x86', 45]
  ])

  request.post(url, {
      "source_code": Base64.encode(code),
      "language_id": langId.get(lang),
      "stdin": Base64.encode(input),
      "compiler_options": "",
      "command_line_arguments": "",
      "redirect_stderr_to_stdout": "true"
  }).then(
    response => setTimeout(() => getJudgeResult(response.data.token, callback), 1000)
  ).catch(
    err => {
      console.error(err)
      callback('error：等待响应超时！')
    }
  )

}

const getJudgeResult = (token: string, callback: Function, tryCount = 0) => {

  if (tryCount === 9) {
    console.log("重试次数达到9次")
    callback('error：代码运行时间过长！')
    return 0
  }

  let url = 'submissions/' + token + '?base64_encoded=true'

  request.get(url).then(
    response => {
      if([1,2].includes(response.data.status.id)) {
        //  1为后端准备中状态，2为在队列中等待状态，过1s再去请求一次
        setTimeout(() => getJudgeResult(token, callback, tryCount + 1), 1000)
      } else if (response.data.status.id === 3) {
        //  3为完成的状态，将结果处理并返回
        let time = response.data.time * 1000
        let memory = response.data.memory
        let stdout = Base64.decode(response.data.stdout || '')
        let outputStr = `// time: ${time}ms,  memory: ${memory}kb\n${stdout}`
        callback(outputStr)
      } else {
        // 其他情况都为错误状态，将对应的描述返回
        let error = response.data.status.description
        let info = Base64.decode(response.data.compile_output || '')
        let outputStr = `${error}\n${info}`
        callback(outputStr)
      }
    }
  ).catch(
    err => {
      console.error(err)
      callback('error：等待响应超时！')
    }
  )

}


import { Base64 } from 'js-base64';

import { request } from '../utils/request';


export const submitCode = ({ code = '', lang = 'c_cpp', input = '' }, callback: Function) => {

  let url = '/submissions?base64_encoded=true&wait=false'
  let langId = new Map([
    ['c_cpp', 53],
    ['java', 62],
    ['python', 71]
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
      callback('与后端的网络连接有问题')
    }
  )

}

const getJudgeResult = (token: string, callback: Function, tryCount = 0) => {

  if (tryCount === 6) {
    console.log("重试次数达到6次")
    callback('代码运行时间过长,已自动停止')
    return 0
  }

  let url = 'submissions/' + token + '?base64_encoded=true'

  request.get(url).then(
    response => {
      if([1,2].includes(response.data.status.id)) {
        //  1为后端准备中状态，2为在队列中等待状态，过3s再去请求一次
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
        let outputStr = `${response.data.status.description}`
        callback(outputStr)
      }
    }
  ).catch(
    err => {
      console.error(err)
      callback('与后端的网络连接有问题')
    }
  )

}

function elif(arg0: boolean) {
  throw new Error('Function not implemented.');
}


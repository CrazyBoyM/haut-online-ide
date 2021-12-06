<script setup lang="ts">
import { VAceEditor } from 'vue3-ace-editor'
import { inject, Ref } from 'vue'
import { useMessage } from 'naive-ui'
import { setItem } from '/@/utils/localData'
import { submitCode } from '/@/api/submission'

const message = useMessage()

const code = inject('code') as Ref<string>
const input = inject('input') as Ref<string>
const output = inject('output') as Ref<string>
const lang = inject('lang') as Ref<string>
const theme = inject('theme') as Ref<any>

//  设置输出控制台内容的钩子
const setOutput = inject('setOutput') as (val: string) => void

//  代码评测状态
const judging = inject('judging') as Ref<boolean>

const handleSubmit = () => {
  if(code.value.match(/^\s*$/)) {
    message.warning('请输入代码')
    return 0
  }
  judging.value = true
  let data = {
    code: code.value,
    lang: lang.value,
    input: input.value
  }
  submitCode(data, (output: string) => {
    setOutput(output)
    judging.value = false
  })
}

//  处理保存事件
const init = (editor: any) => {
  let commands = editor.commands;
  commands.addCommand({
      name: "save",
      bindKey: {win: "Ctrl-S", mac: "Command-S"},
      exec: function(arg: any) {
          setItem(
              "code",
              code.value
          )
          setItem(
              "input",
              input.value
          )
          setItem(
              "output",
              output.value
          )
          message.success('已保存')
      }
  })
  commands.addCommand({
    name: "run",
      bindKey: {win: "Ctrl-R", mac: "Command-R"},
      exec: function(arg: any) {
          handleSubmit()
      }
  })
}
</script>

<template>
  <v-ace-editor
    v-model:value="input"
    @init="init"
    :theme="theme.editorTheme"
    lang="text"
    placeholder='输入控制台'
    style="height: 100%; font-size: 19px" />
</template>
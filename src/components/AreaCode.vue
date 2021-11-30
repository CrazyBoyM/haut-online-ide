<script setup lang="ts">
import { inject, Ref } from 'vue'
import { useMessage } from 'naive-ui'
import { VAceEditor } from 'vue3-ace-editor'
import { setItem } from '/@/utils/localData'

const lang = inject('lang') as Ref<string>
const code = inject('code') as Ref<string>
const input = inject('input') as Ref<string>
const output = inject('output') as Ref<string>
const tabSize = inject('tabSize') as Ref<number>
const textSize = inject('textSize') as Ref<number>
const theme = inject('theme') as Ref<any>

//  处理保存事件
const message = useMessage()
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
}

//  编辑器默认提示内容
const placeholder = `----------------------------
  地址：ip3x.com
----------------------------


快捷键：
  Ctrl + s 保存\n  Ctrl + d 删除当前行\n  Ctrl + z 返回   Ctrl + y 前进\n  Ctrl + f 查找与替换

优点：
    0、无需安装任何工具、配置编译环境。
    1、通过浏览器就可以练习，支持缓存代码。
    2、可用于蓝桥杯、XCPC、面试刷题，提高睡眠质量等。
`
</script>

<template>
  <v-ace-editor
    v-model:value="code"
    @init="init"
    :lang="lang"
    :theme="theme.editorTheme"
    :placeholder="placeholder"
    :options="{ 
                useWorker: true,
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true,
                tabSize,
                fontSize: textSize
              }"
    :style="{ height: '100%' }" />
</template>
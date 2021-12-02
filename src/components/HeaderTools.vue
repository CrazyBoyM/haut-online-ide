<script setup lang="tsx">
import { inject, ref, Ref, h } from 'vue'
import { NButton, NDropdown, useNotification, useMessage, useDialog } from 'naive-ui'
import ConfigThemeVue from './ConfigTheme.vue'
import { submitCode } from '../api/submission'
import { setItem, removeItem, getItem } from '/@/utils/localData'

const notification = useNotification()
const message = useMessage()
const dialog = useDialog()

//  “更多”菜单选项相关
const initialTheme = {
  editorBgColor: 'rgba(255,250,232,1)',
  editorTheme: 'xcode',
  editorActiveLineBgColor: 'rgba(238,232,213,1)',
  editorBarBgColor: 'rgba(238,232,213,1)',
  editorBarTextColor: '#333',
  headerBgColor: 'rgba(238,232,213,1)',
  headerLogoColor: '#333',
  headerTextColor: '#333',
  bgUrl: '',
  bgBlur: 0
}
interface Theme {
    [x: string]: any
    editorBgColor: string;
    editorTheme: string;
    editorActiveLineBgColor: string;
    editorBarBgColor: string;
    editorBarTextColor: string;
    headerBgColor: string;
    headerTextColor: string;
    headerLogoColor: string;
    bgUrl: string;
    bgBlur: number;
}
const theme = inject('theme') as Theme
const setTheme = inject('setTheme') as (val: object) => void
const menuOptions = [
        {
          label: '主题色配置',
          props: {
            onClick: () => dialog.success({
              title: '主题配置板',
              content: () => <ConfigThemeVue theme={theme} />,
              negativeText: '重置',
              onNegativeClick: () => {
                setTheme(initialTheme)
                removeItem('theme')
                message.success('已恢复默认主题!')
              },
              positiveText: '保存',
              onPositiveClick: () => {
                setItem('theme', JSON.stringify(theme.value))
                message.success('已保存主题！')
              },
              onClose: () => {
                let oldTheme = JSON.parse(getItem('oldTheme') as string)
                setTheme(oldTheme)
              },
              maskClosable: false,
              style: { width: 'auto' }
            })
          }
        },
        {
          label: '内置快捷键',
          props: {
            onClick: () => notification.info({
              title: '快捷键',
              description: '这是一些常用的内置快捷键命令。',
              content: `  Ctrl + s 保存   Ctrl + r 运行\n  Ctrl + z 返回   Ctrl + y 前进\n  Ctrl + f 查找与替换\n  Ctrl + d 清除当前一行`,
            })
          }
        },
        {
          label: '资源推荐',
          props: {
            onClick: () => notification.create({
              title: '资源',
              description: '这里有一些适合练习的[通用算法]学习资源推荐。',
              content: () => h('div', {class: 'space-y-3'},
                [
                  h('li',h('a',{href: 'https://www.nowcoder.com/ta/job-code-high', target: '_blank', class: 'text-base text-green-500'}, '牛客高频题榜')),
                  h('li',h('a',{href: 'https://www.luogu.com.cn/training/list', target: '_blank', class: 'text-base text-green-500'}, '洛谷精选题单')),
                  h('li',h('a',{href: 'https://leetcode-cn.com/problem-list/2cktkvj', target: '_blank', class: 'text-base text-green-500'}, '力扣TOP100题')),
                ]),
            })
          }
        },
        {
          label: '关于本应用',
          props: {
            onClick: () => notification.create({
              title: '关于',
              content: `名称: Haut Online IDE\n版本: 1.0.0\n开发者团队: A02N119 寝室\n问题反馈邮箱：ai-lab@foxmail.com`,
            })
          }
        }
      ]

//  编辑器语言选择相关
const langOptions = [
        {
         label: 'C/C++',
         key: 'c_cpp'
        },
        {
          label: 'C#',
          key: 'csharp'
        },
        {
          label: 'Go',
          key: 'golang'
        },
        {
          label: 'Kotlin',
          key: 'kotlin'
        },
        {
          label: 'Java',
          key: 'java'
        },
        {
          label: 'JavaScript',
          key: 'javascript'
        },
        {
          label: 'TypeScript',
          key: 'typescript'
        },
        {
          label: 'Python',
          key: 'python'
        },
        {
          label: 'PHP',
          key: 'php'
        },
        {
          label: 'Lua',
          key: 'lua'
        },
        {
          label: 'shell(Bash)',
          key: 'sh'
        },
        {
          label: 'R',
          key: 'r'
        },
        {
          label: 'Lisp',
          key: 'lisp'
        },
        {
          label: 'haskell',
          key: 'haskell'
        },
        {
          label: 'assembly_x86(汇编)',
          key: 'assembly_x86'
        },
      ]
const lang = inject('lang') as Ref<string>
const setLang = inject('setLang') as (val: string) => void
const handleSelectLang = (key: string) => {
  setLang(key)
}

//  编辑器tab大小选择相关
const tabSizeOptions = [
        {
         label: '2个空格',
         key: 2
        },
        {
         label: '4个空格',
         key: 4
        },
      ]
const tabSize = inject('tabSize') as Ref<number>
const setTabSize = inject('setTabSize') as (val: number) => void
const handleSelectTabSize = (key: number) => {
  setTabSize(key)
}

//  编辑器字号选择相关
const textSizeOptions = [
        {
         label: '27px',
         key: 27
        },
        {
         label: '25px',
         key: 25
        },
        {
          label: '23px',
          key: 23
        },
        {
          label: '21px',
          key: 21
        },
        {
          label: '19px',
          key: 19
        },
        {
          label: '17px',
          key: 17
        }
      ]
const textSize = inject('textSize') as Ref<number>
const setTextSize = inject('setTextSize') as (val: number) => void
const handleSelectTextSize = (key: number) => {
  setTextSize(key)
}

//  代码内容
const code = inject('code') as Ref<string>
//  输入数据内容
const input = inject('input') as Ref<string>
//  设置输出控制台内容的钩子
const setOutput = inject('setOutput') as (val: string) => void

//  提交代码评测
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

</script>

<template>
  <div class="flex pr-6">
    <div class="flex space-x-3.5 pr-3.5">
      <n-dropdown
        trigger="hover"
        @select=""
        placement="bottom-start"
        :options="menuOptions"
      >
        <n-button text> help </n-button>
      </n-dropdown>

      <n-dropdown
        trigger="hover"
        @select="handleSelectTabSize"
        placement="bottom-start"
        :options="tabSizeOptions"
      >
        <n-button text> tab: {{ tabSize }} </n-button>
      </n-dropdown>

      <n-dropdown
        trigger="hover"
        @select="handleSelectTextSize"
        placement="bottom-start"
        :options="textSizeOptions"
      >
        <n-button text> size: {{ textSize }} </n-button>
      </n-dropdown>
      
      <n-dropdown
        trigger="hover"
        @select="handleSelectLang"
        placement="bottom-start"
        :options="langOptions"
      >
        <n-button text> lang: {{ lang }} </n-button>
      </n-dropdown>
    </div>
    <n-button type="primary" :loading="judging" :disabled="judging" @click="handleSubmit" round>运行（Run）</n-button>
  </div>
</template>
<script setup lang="ts">
import Page from '/@/layout/Page.vue'
import Header from '/@/layout/Header.vue'
import Content from '/@/layout/Content.vue'
import AreaCode from '/@/components/AreaCode.vue'
import AreaStdIn from '/@/components/AreaStdIn.vue'
import AreaStdOut from '/@/components/AreaStdOut.vue'
import HeaderLogo from '/@/components/HeaderLogo.vue'
import HeaderTools from '/@/components/HeaderTools.vue'
import { provide, ref } from 'vue'
import { getItem, setItem } from '/@/utils/localData'


//  页面主题相关
const initialTheme = {
  editorBgColor: 'rgba(255,250,232,1)',
  editorTheme: 'xcode',
  editorActiveLineBgColor: 'rgba(238,232,213,1)',
  editorBarBgColor: 'rgba(238,232,213,1)',
  editorBarTextColor: '#666',
  headerBgColor: 'rgba(238,232,213,1)',
  headerLogoColor: '#333',
  headerTextColor: '#555',
  bgUrl: '',
  bgBlur: 0
}
const theme = ref({
  ...initialTheme,
  ...JSON.parse(getItem('theme') as string),
})
const setTheme = (obj: object) => {
  theme.value = { ...obj }
}
provide('theme', theme)
provide('setTheme', setTheme)

//  代码编辑器的语言
const lang = ref(getItem('lang') || 'c_cpp')
//  设置编辑器语言的钩子
const setLang = (val: string) => {
  lang.value = val
  setItem('lang', lang.value)
}
provide('lang', lang)
provide('setLang', setLang)


//  代码编辑器的tab大小
const tabSize = ref(parseInt(getItem('tabSize') as string) || 2)
//  设置tab的钩子
const setTabSize = (val: number) => {
  tabSize.value = val
  setItem('tabSize', tabSize.value.toString())
}
provide('tabSize', tabSize)
provide('setTabSize', setTabSize)


//  代码编辑器的字号
const textSize = ref(parseInt(getItem('textSize') as string) || 23)
//  设置编辑器字号的钩子
const setTextSize = (val: number) => {
  textSize.value = val
  setItem('textSize', textSize.value.toString())
}
provide('textSize', textSize)
provide('setTextSize', setTextSize)


//  代码编辑器的内容
const initialCode = `#include<stdio.h>

int main() {
  int a, b, sum = 0;
  scanf("%d %d", &a, &b);
  sum = a + b;
  printf("%d", sum);
  return 0;
}`
const code = ref(getItem('code') || initialCode)

//  输入控制台的内容
const initialInput = `1 2`
const input = ref(getItem('input') || initialInput)

//  输出控制台的内容
const output = ref(getItem('output') || '')

//  设置输出控制台内容的钩子
const setOutput = (val: string) => {
  output.value = val
}
provide('code', code)
provide('input', input)
provide('output', output)
provide('setOutput', setOutput)
</script>

<template>
  <Page 
    :style="{
        '--editor-bgColor': theme.editorBgColor,
        '--editorActiveLine-bgColor': theme.editorActiveLineBgColor,
        '--editorBar-bgColor': theme.editorBarBgColor,
        '--editorBar-textColor': theme.editorBarTextColor,
        '--header-bgColor': theme.headerBgColor,
        '--header-logoColor': theme.headerLogoColor,
        '--header-textColor': theme.headerTextColor,
        '--bg-url': `url('${theme.bgUrl}')`,
        '--bg-blur': `${theme.bgBlur / 3}px`,
      }">
    <Header>
      <div class="flex flex-row items-center justify-between w-full h-full">
        <HeaderLogo />
        <HeaderTools />
      </div>
    </Header>
    <Content>
      <div class="flex flex-col-reverse w-full h-auto p-2 overflow-auto xl:p-3 lg:flex-row lg:h-full">
        <div class="w-full h-screen pr-1 lg:h-full lg:w-1/3">
          <div class="w-full rounded-tr h-1/2">
            <AreaStdIn />
          </div>
          <div class="w-full pt-1 rounded-br h-1/2">
            <AreaStdOut />
          </div>
        </div>  
        <div class="w-full h-screen rounded-tl rounded-bl-lg lg:w-2/3 lg:h-full">
          <AreaCode />
        </div>
      </div>
    </Content>
  </Page>
</template>

<style>
/* 覆盖编辑器样式 */
.ace_editor {
  background-color: inherit!important;
}
.ace_active-line {
  background-color: var(--editorActiveLine-bgColor)!important;
}
.ace_gutter {
  color: var(--editorBar-textColor)!important;
  background-color: var(--editorBar-bgColor)!important;
}
.ace_content {
  background-color: var(--editor-bgColor)!important;
}
</style>
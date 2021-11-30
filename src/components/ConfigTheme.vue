<script setup lang="ts">
import { NForm, NGrid, NFormItemGi, NColorPicker, NSelect, NInput, NSlider } from 'naive-ui'

interface Theme {
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
const props = defineProps<{ theme: Theme }>()
const theme = props.theme
const editorThemeOptions = ['chrome', 'xcode', 'github', 'monokai', 'dracula'].map(
      (v) => ({
        label: v,
        value: v
      })
    )
</script>

<template>
  <n-form
    :model="theme"
    ref="formRef"
    label-placement="top"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="编辑器背景色" path="editorBgColor">
        <n-color-picker
          v-model:value="theme.editorBgColor"
          :swatches="['rgba(255,250,232,1)', 'rgba(238,232,213,1)']"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="编辑器高亮方案" path="editorTheme">
        <n-select
          placeholder="Select"
          :options="editorThemeOptions"
          v-model:value="theme.editorTheme"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="编辑器侧栏色" path="editorBarColor">
        <n-color-picker
          v-model:value="theme.editorBarBgColor"
          :swatches="['rgba(255,250,232,1)', 'rgba(238,232,213,1)']"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="编辑器侧栏字体色" path="editorBarTextColor">
        <n-color-picker
          v-model:value="theme.editorBarTextColor"
          :swatches="['#333', '#666']"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="高亮行背景色" path="editorActiveLineBgColor">
        <n-color-picker
          v-model:value="theme.editorActiveLineBgColor"
          :swatches="['rgba(255,250,232,1)', 'rgba(238,232,213,1)']"
          round
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="顶部背景色" path="headerBgColor">
        <n-color-picker
          v-model:value="theme.headerBgColor"
          :swatches="['rgba(255,250,232,1)', 'rgba(238,232,213,1)']"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="顶部字体色" path="headerTextColor">
        <n-color-picker
          v-model:value="theme.headerTextColor"
          :swatches="['#333', '#666']"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="顶部标题色" path="headerLogoColor">
        <n-color-picker
          v-model:value="theme.headerLogoColor"
          :swatches="['#333', '#666']"
        />
      </n-form-item-gi>
      
      <n-form-item-gi :span="24" label="背景图链接（用图床上传，如：imgurl.org）" path="bgUrl">
        <n-input
          name="bgUrl"
          v-model:value="theme.bgUrl"
          placeholder="Eg: https://..."
          clearable
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="背景模糊度" path="bgUrl">
        <n-slider
          v-model:value="theme.bgBlur"
          :format-tooltip="(value: number) => `${value}%`"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>
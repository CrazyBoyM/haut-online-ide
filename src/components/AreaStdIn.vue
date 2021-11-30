<script setup lang="ts">
import { VAceEditor } from 'vue3-ace-editor'
import { inject, Ref } from 'vue'

const input = inject('input') as Ref<string>
const theme = inject('theme') as Ref<any>
</script>

<template>
  <v-ace-editor
    v-model:value="input"
    @init=""
    :theme="theme.editorTheme"
    lang="text"
    placeholder='输入控制台'
    style="height: 100%; font-size: 19px" />
</template>
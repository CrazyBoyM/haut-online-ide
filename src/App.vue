<script setup lang="ts">
import { NNotificationProvider, NMessageProvider, NDialogProvider } from 'naive-ui';
import Home from '/@/views/Home/index.vue'
</script>

<template>
  <n-message-provider>
    <n-notification-provider>
      <n-dialog-provider>
        <Home />
      </n-dialog-provider>
    </n-notification-provider>
  </n-message-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>

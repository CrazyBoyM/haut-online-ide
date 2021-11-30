import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
        "/@": resolve(__dirname, './src'), // 路径别名
      },
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  }
})


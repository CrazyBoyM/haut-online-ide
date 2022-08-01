import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { minifyHtml, injectHtml } from 'vite-plugin-html'

// const htmlPlugin = () => {
//   return {
//     name: 'html-transform',
//     transformIndexHtml(html) {
//       return html.replace(
//         /\/assets\//g,
//         'https://cdn.jsdelivr.net/gh/CrazyBoyM/haut-online-ide/dist/assets/'
//       )
//     }
//   }
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), minifyHtml(), injectHtml()],
  resolve: {
    alias: {
        "/@": resolve(__dirname, './src'), // 路径别名
      },
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
              if (id.includes('node_modules')) {
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
          }
        }
    }
  }
})
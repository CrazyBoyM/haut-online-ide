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
    sourcemap: true,
    outDir: 'distp', //指定输出路径
    assetsDir: 'static/img/', // 指定生成静态资源的存放路径
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const arr = id.toString().split('node_modules/')[1].split('/')
            switch(arr[0]) {
              case '@kangc':
              case '@naturefw':
              case '@popperjs':
              case '@vue':
              case 'axios':
              case 'element-plus':
                return '_' + arr[0]
                break
              default :
                return '__vendor'
                break
            }
          }
        },
        chunkFileNames: 'static/js1/[name]-[hash].js',
        entryFileNames: 'static/js2/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      },
      // brotliSize: false, // 不统计
      // target: 'esnext', 
      // minify: 'esbuild' // 混淆器，terser构建后文件体积更小
    }
  },
})
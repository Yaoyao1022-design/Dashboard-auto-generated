import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

const boardKit = path.resolve(__dirname, '../../项目DEMO/看板组件库')
const luiRoot = path.resolve(__dirname, '../../项目DEMO/人资风险成本诊断/node_modules/@lui')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    fs: {
      allow: [__dirname, boardKit, luiRoot]
    }
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 让构建后的 dist/index.html 可以通过 file:// 直接打开
  base: './'
})

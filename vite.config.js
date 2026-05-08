import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // 极其重要：base 必须对应你的 GitHub 仓库名
  // 这样打包后的资源路径才会变成 /coffechat-poster/assets/...
  base: '/coffechat-poster/', 
})
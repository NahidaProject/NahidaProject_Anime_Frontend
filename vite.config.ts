import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      '/getip':{
        target:'http://pv.sohu.com/cityjson?ie=utf-8',
        changeOrigin:true
      }
    }
  }
})
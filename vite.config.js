import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
export default defineConfig({
  plugins: [react()],
  base: './',   
=======
// https://vite.dev/config/
export default defineConfig({
   base: './',
  plugins: [react()],
  server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3001',
      changeOrigin: true,
      secure: false,
    },
  },
},

>>>>>>> 40191228f44998be6d471fb96e3a02eb808d27fc
})

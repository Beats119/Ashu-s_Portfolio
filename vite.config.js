import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
export default defineConfig({
 base:'/Ashu-s_Portfolio/',
 plugins:[react(),viteCompression()],
 build:{outDir:'dist',emptyOutDir:true}
})
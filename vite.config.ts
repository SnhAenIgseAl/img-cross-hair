import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import electron from 'vite-plugin-electron'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
        vue(),
        electron({
            entry: 'background.js',
        })
    ],
	resolve: {
        alias:{
            '@': path.resolve(__dirname, './src'),
            "../": path.resolve(__dirname, './src')
        },
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
        // proxy: {
        //     '/api': {
        //         target: 'https://pilipili-server.icu',
        //         // target: 'http://127.0.0.1:18848',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, '')
        //     },
        // }
    },
    base: '/',
    esbuild: {
        // drop: ['console', 'debugger']
    }
})

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { plugin as markdown, Mode } from 'vite-plugin-markdown' // new import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    markdown({ mode: [Mode.HTML] }), // ensure markdown plugin is configured to return HTML content
  ],
  assetsInclude: ['**/*.md'], // include .md files as assets
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

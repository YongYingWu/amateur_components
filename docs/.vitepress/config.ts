import sidebar from './guide/sidebar';
import navbar from './guide/navbar';
import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

// .vitepress/config.js
export default defineConfig({
  // 站点级选项
  title: 'VitePress',
  description: 'Just playing around.',
  lang: 'cn-ZH',
  lastUpdated: true,
  outDir: '../dist/vitepress',
  base: '/vitepress/',
  markdown: {
    config: (md) => mdPlugin(md),
  },
  vite: {
    plugins: [pagefindPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (e) => {
            if (e.includes('/node_modules/monaco-editor/')) return 'monaco'
            else
              return 'vendor'
          },
        },
      },
    },
  },

  themeConfig: {
    outline: [1,4],
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/wocwin/t-ui-plus' }
    // ],
    // 主题级选项
    nav: navbar,
    sidebar: sidebar
  }
})
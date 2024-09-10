import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import elementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import * as ElIcon from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
Object.keys(ElIcon).forEach((key) => {
  app.component(key, ElIcon[key])
})

app.use(createPinia())
app.use(router)

app.mount('#app')

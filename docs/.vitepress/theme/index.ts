import DefaultTheme from "vitepress/theme"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import locale from "element-plus/es/locale/lang/zh-cn"
import "../../../packages/style/variables-default.scss"
import "../../../packages/style/flex.scss"

// 更改vitepress原生样式
import "./styles/palette.scss"
// 图标并进行全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
// import * as echarts from "echarts" // 引入echarts
import { VPDemo } from "../vitepress"
// 基于element-plus二次封装基础组件
import AmateurComp from "../../../packages/components"
// import TuiPlus from "../../../packages"
// import "../../public/css/index.css"

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // ctx.app.config.globalProperties.$echarts = echarts // 全局使用
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    // 全局注册基础组件
    ctx.app.use(AmateurComp)

    ctx.app.component("Demo", VPDemo)
  }
}

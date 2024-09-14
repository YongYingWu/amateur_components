### 快速上手

::: tip 提示

组件基于 vue3 + ts + Element-plus 再次封装的基础组件

:::

### 安装

```bash:no-line-numbers

```

### 全局使用

> #### 前提条件：使用项目必须全局注册 Element-plus 组件库

```js
// main.ts
import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import locale from "element-plus/es/locale/lang/zh-cn"
// element-plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import amateurComponents from "amateurComponents"
const app = createApp(App)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册ElementPlus
app.use(ElementPlus, {
  locale
})
// 全局注册组件
app.use(amateurComponents)
app.mount("#app")
```
### 按需引入
```js
// 单个.vue文件引入
<script setup lang="ts">
  import {TitleInput} from "amateurComponents"
</script>
```
### 全部组件如下
| 组件名称        | 说明                                                                                                                                                       |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TLayoutPage     | 布局页面                                                                                                                                                   |
| TLayoutPageItem | 布局页面子项                                                                                                                                               |
| TAdaptivePage   | [一屏组件](https://wocwin.github.io/t-ui-plus/components/TAdaptivePage/base.html?_blank)（继承TTable 及 TQueryCondition 组件的所有属性、事件、插槽、方法） |                                                             |


### 🔨 Vue3 + Vite 项目中安装引入报如下错误的解决方法

> #### 把项目的 vite 版本升级到 4+


### 项目目录结构

```
├─ .vitepress useless
├─ .vscode vscode 配置
├─ css3 css3 demo
├─ docs 文档生成所在目录
├─ packages 开发文件夹
│  ├─ components 开发组件
├─ public
├─ scripts 脚本文件
└─ template 模板文件 脚本生成所用模板
```

### docs 文档结构目录

```
├─ examples               # VPDemo自动解析此文件夹下的所有.vue文件
├─ components             # .md文件 用于生成页面
├─ public                 # 静态资源文件
├─ .vitepress
│  ├─ config              # 插件配置
|  │  ├─ global.ts        # 全局变量定义
|  │  └─ plugins.ts       # 自定义.md文件渲染
│  ├─ guide               # 组件路由
|  │  ├─ navbar.ts        # top路由
|  │  └─ sidebar.ts       # 侧边路由
│  ├─ theme               # 主题配置
│  ├─ utils               # 文档展开隐藏代码高亮
│  ├─ vitepress
|  │  ├─ demo          #    VPDemo组件源码
|  │  ├─ style            # VPDemo组件样式
|  │  └─ index.ts         # 暴露VPDemo组件
│  └─ config.ts           # vitepress配置文件
└─ index.md               # 文档home页面
```

### 脚本介绍

- `pnpm run create:comp $i` 在`packages/components`下创建`$i`组件, 以及生成`demo`文件
- `pnpm run create:docs $i` 生成`$i`组件的`md`文档(包含`props` 组件`demo`)
- `pnpm run create:demo $i` `pnpm run create:comp $i && pnpm run create:docs $i`

### 快速创建组件
- `pnpm run create:demo componentName`
- 在`docs/.vitepress/guide/sidebar.ts` 文件中添加`componentName`路由
- 在`packages/components/index.ts` 中导出`componentName`组件

### Git 提交规范（PR 提交规范）

- `ci`: ci 配置文件和脚本的变动;
- `chore`: 构建系统或辅助工具的变动;
- `fix`: 代码 BUG 修复;
- `feat`: 新功能;
- `perf`: 性能优化和提升;
- `refactor`: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
- `style`: 代码格式调整，可能是空格、分号、缩进等等;
- `docs`: 文档变动;
- `test`: 补充缺失的测试用例或者修正现有的测试用例;
- `revert`: 回滚操作;


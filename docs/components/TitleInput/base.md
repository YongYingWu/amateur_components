# TitleInput 标题表单

### 基础用法
:::warning
tagType可以是组件名，也可以是组件实例，但是组件名需要组件已经注册
:::
:::demo
TitleInput/common
:::

### 使用目标组件`tagType`内部插槽
:::demo 直接在组件中使用目标组件的插槽即可，组件内部通过`$slots`绑定到目标组件上
TitleInput/targetSlot
:::

### 尺寸
:::demo 通过`size`来控制表单主键的大小, 需要组件本身也支持`size`属性
TitleInput/size
:::

### 使用激活边框
:::demo 通过`activeOutline`来开启激活边框
TitleInput/activeOutline
:::

### 自定义内容
:::demo 通过`custom`插槽来自定义内容，需要注意插槽位于组件尾部
TitleInput/custom
:::

### TitleInput API

>除了所列的API和属性，只要是目标属性所支持的属性，都可以传入，组件内部通过v-bind绑定到目标组件上


#### TitleInput属性
| 属性名              | 说明                                                             | 类型                                                                            | 默认值 |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| size              | 组件大小, 继承自目标组件的size属性                                                             | `string`                                          | —       |
| class             | 自定义类名                                                              | `string`                                                                       | —       |
| style             | 自定义样式                                                              | `object`                                                                       | —       |
| tagType           | 目标组件（组件名\|组件实例），组件名需要组件已被注册        | `Object[component]\|string\|boolean`                                                                        | —       |
| title             | 标题文本                                                              | `string`                                                                       | —       |
| suffix             | 尾部文本                                                              | `string`                                                                       | —       |
| titleClassName     | 标题文本类名                                                              | `string`                                                                       | —       |
| titleStyle        | 标题文本样式                                                              | `Object`                                                                       | —       |
| suffixStyle        | 尾部文本样式                                                              | `Object`                                                                       | —       |
| clearable        | 开启清理按钮（继承自目标组件）                                                              | `Boolean`                                                                       | `true`     |
| isHidden        | 是否溢出隐藏                                                              | `Boolean`                                                                       | `false`     |
| activeOutline   | 选择激活边框                                                              | `Boolean`                                                                       | `false`     |


#### TitleInput插槽
> tagType 所指向组件的插槽也可以直接使用

| 插槽名              | 说明                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| custom | 自定义内容，位于组件尾部 |

#### TitleInput方法
>与目标组件一致


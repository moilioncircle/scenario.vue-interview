# vue-interview-test

### 实现动态tab功能

本题使用 iView 做为UI组件库, 地址: https://iviewui.com/components/menu

使用es6语法

请先通读 下方全文, 再开始编码

#### 概念介绍
> 1. `side menu`: 左侧菜单
> 2. `menu tabs`: 上方多tabs的组件 (即题目要求实现的功能), 完整功能见视频演示, demo.mp4

#### 阶段性要求: 

##### 第一阶段: (基本功能)
> 1. 默认显示一个 `Home` tab
> 2. 点击`side menu`切换到新route时, 会创建对应的tab添加到`menu tabs`组件上
> 3. tab可关闭
> 4. `side menu`与`menu tabs`的 active状态 联动
> 5. 使用浏览器的 前进 | 后退 时, `side menu` 与 `menu tabs` 会与之联动
> 6. 只剩一个tab时, 不可关闭 (最少保留一个tab)

##### 第二阶段: (组件缓存)
> 1. 打开tab的同时, 缓存子页面的组件. 关闭tab时, 销毁组件.
> 2. 请在组件的生命周期钩子给出console.log输出, 以表示组件被正确的创建和销毁

##### 第三阶段: (状态保存与恢复)
> 1. 刷新页面后, `menu tabs`可恢复之前状态
> 2. 即: 若打开2个tabs, 刷新后依然显示这2个tabs

##### 第四阶段: (附加功能)
> 1. 可对`menu tabs`拖拽排序
> 2. tab支持右键菜单, 只有一个选项 'Close Others': 关闭其他tab页





### Compiles and hot-reloads for development
```
yarn run serve
```

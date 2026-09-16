# 业务项目 Agent 约定（双组件库）

本项目基于 Vue 2.7 + LUI，并依赖看板库 `jdl-board-kit`。生成或修改页面时必须同时引用这两套组件，不要自造重复 UI。

## 依赖

- 基础组件：`@lui/lui-ui`、`@lui/lui-pro`（表单、按钮、Dialog、Pagination、Layout）
- 看板组件：`jdl-board-kit`（本地路径 `../../项目DEMO/看板组件库`）

入口需注册并引入样式：

```js
import BoardKit from 'jdl-board-kit'
import 'jdl-board-kit/src/styles/tokens.css'
import 'jdl-board-kit/src/styles/layout.css'
Vue.use(BoardKit)
```

## 选型

| 场景 | 库 |
|------|----|
| Layout、菜单、表单、Button、Dialog、Pagination、通用 CRUD Table | 基础组件 |
| 指标、趋势、排行、看板标题/标签、SwitchCard、看板 Chart | jdl-board-kit |
| 可混用 | 外层基础筛选/布局 + 内层看板积木 |

详细流程与检查清单：使用 Cursor Skill **jdl-dual-kit-page**。
看板组件清单：看板仓库根目录 **AGENTS.md**。

## 禁止

- 用原生 HTML / 手写样式复刻 MetricBlock、SwitchCard、RankList 等
- 未引入 `tokens.css` / `layout.css` 就使用看板组件
- 编造不存在的组件名或 props（应读源码或已有页面）

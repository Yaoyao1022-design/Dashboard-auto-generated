# 人资风险成本诊断 PRD

| 项 | 内容 |
| --- | --- |
| 产品名称 | 人资风险成本诊断 |
| 文档范围 | 人力经营驾驶舱、人力成本 ROI 大屏、跑冒滴漏大屏、明细抽屉、任务中心 |
| 文档类型 | 展示层数据结构 + 页面需求 |
| 版本 | V1.0 |
| 日期 | 2026-09-16 |

---

## 1. 背景与目标

面向人资经营管理者，提供「成本诊断」与「跑冒滴漏」一体的经营看板，支持按组织层级筛选、主题切换、下探明细，并将异常与改善动作沉淀到任务中心闭环。

**核心目标**

1. 一眼看清当期人力成本费率、成本、收入、人数及趋势。
2. 一眼看清巡检识别、处置闭环、挽损金额及高风险组织/场景/人员。
3. 从看板下探到指标、科目、组织、人员明细，并可导出。
4. 从看板跳转到任务中心，跟踪处理中、逾期与挽损。

---

## 2. 信息架构

```
成本诊断
├── 人力经营驾驶舱（cockpit）
│   ├── 全局筛选
│   ├── 主题切换卡：人力成本分析 / 跑冒滴漏分析
│   ├── 人力成本经营概览 + 部门/条线详情
│   └── 跑冒滴漏巡检概览 + 组织/场景/人员下探
├── 数据看板
│   ├── 人力成本 ROI 大屏（labor-roi，独立人力主题）
│   └── 跑冒滴漏大屏（leak-screen，独立跑冒滴漏主题）
└── 任务中心
    └── 任务列表（task-center）

抽屉（覆盖驾驶舱/大屏，不单独占路由）
├── 全量指标明细
├── 综合人工成本
├── 异常明细（单人）
├── 组织全量明细（四级下钻）
├── AI 报告
└── 全部人员明细
```

**路由**

| 页面 | path | 说明 |
| --- | --- | --- |
| 人力经营驾驶舱 | `/cockpit` | 双主题切换 |
| 人力成本 ROI 大屏 | `/labor-roi` | 仅人力成本面板 |
| 跑冒滴漏大屏 | `/leak-screen` | 仅跑冒滴漏面板 |
| 任务中心 | `/task-center` | 任务列表 |

---

## 3. 全局筛选

驾驶舱与两块大屏共用同一套筛选。切换组织层级时，清空省区/条线/一级部门。

| 字段 | 类型 | 取值 | 展示条件 |
| --- | --- | --- | --- |
| orgLevel | enum | `hq` 物流总部 / `province` 省区 / `line` 条线 / `c1` C1 | 始终展示 |
| line | string | 末端、转运、仓储、城配、冷链、国际、供应链 | `orgLevel=line` |
| province | string | 江苏、浙江、广东、北京、上海、四川、湖北 | `orgLevel=province \| line` |
| c1Dept | string | 运营、科技、财务、人力资源、综合、省区职能 | `orgLevel=c1` |
| timeRange | date | `yyyy-MM-01` | 始终展示（月选择） |

操作：重置、查询。查询后刷新看板数值种子。

---

## 4. 页面需求

### 4.1 主题切换卡（仅驾驶舱）

两张大卡互斥选中，选中后切换下方面板。每张卡提供「AI 报告」查看/下载。

| 字段 | 说明 |
| --- | --- |
| key | `labor` / `leak` |
| title | 人力成本分析 / 跑冒滴漏分析 |
| summary | AI 摘要文案 |
| headerActionText | 固定「AI报告」 |
| metrics[0] | YTD 指标：title、value、unit、trends |
| metrics[1] | 当月指标：title、value、unit、trends |

`trends[]`：`{ name, value, trend }`，`trend` 为 `up | down`。

人力卡示例口径：YTD/当月综合费率，同比、目标差/环比。  
跑冒滴漏卡示例口径：YTD/当月异常条数，挽损、闭环率。

### 4.2 人力成本经营概览

入口：「查看成本改善任务」→ 任务中心。

#### 4.2.1 指标矩阵

切换：YTD 指标 / 月指标。  
操作：「查看综合人工成本」「查看指标详情」。

矩阵 4 列 × 3 行：

| 列 | 行 1（主指标） | 行 2 | 行 3 |
| --- | --- | --- | --- |
| 费率 | 周期标签（YTD/当月） | 固定费率 | 变动费率 |
| 成本 | 综合人工成本 | 固定人工成本 | 变动人工成本 |
| 收入 | 收入 | 单位收入 | 人均收入 |
| 人数 | 人数 | 人均综合人工成本 | 人效 |

单元格：

```ts
{
  name: string
  value: string
  unit?: string          // % / 亿元 / 元 / 人
  primary?: boolean      // 列头主指标
  indicators: { name: string; value: string; trend: 'up' | 'down' }[]
}
```

#### 4.2.2 趋势图

- 周期：年 / 月
- 指标：综合人工成本费率 / 综合人工成本 / 收入
- 图表：`{ seed: number; labels: string[] }`

#### 4.2.3 部门及条线详情

随 `orgLevel` 切换视角。

**总部 / 条线视角**

- 切片：省区 / 一级部门（总部）或二级部门（条线）
- `slice=province`：地图 + AI 摘要 + 城市排行
- `slice=dept`：费率排行 + 效率排行

地图：

```ts
{
  slice: 'province' | 'dept'
  scope: 'ytd' | 'month'
  metric: 'l1l2' | 'l3l4' | 'l5'   // 仅省区切片
  regions: { name?: string; tooltip: { label?: string; value: string }[] }[]
  cityRank: {
    columns: { key: 'rank' | 'rate' | 'yoy'; title: string; trend?: boolean }[]
    rows: { rank: number; name: string; rate: string; yoy: string }[]
  }
}
```

部门排行：

```ts
{
  rateRows: { rank: number; name: string; tag?: string; rate: string; yoy: string }[]
  efficiencyRows: { rank: number; name: string; tag?: string; rate: string; yoy: string }[]
}
```

**省区视角 / C1 视角**

条线（或二级部门）树表：

```ts
{
  nameTitle: string   // 条线 | 二级部门
  columns: [
    { key: 'ytdRate'; title: 'YTD费率' },
    { key: 'ytdYoy'; title: 'YTD费用同比'; trend: true },
    { key: 'monthRate'; title: '当月费率' },
    { key: 'monthYoy'; title: '当月费率同比'; trend: true },
    { key: 'monthMom'; title: '当月费率环比'; trend: true }
  ]
  rows: {
    name: string
    ytdRate: string
    ytdYoy: string
    monthRate: string
    monthYoy: string
    monthMom: string
    children?: rows
  }[]
}
```

**仅 C1**：额外展示预算管控。

- 周期：年 / 月
- 类型：成本预实对比 / HC 预实对比
- 卡片：成本监控（HC 时改名为编制监控）、编制预算
- 分组：YTD / 当月 / MTD（编制预算仅当月）
- 指标项：成本预算/编制预算、实际已用/当日在职、预算使用率、预实偏离度

```ts
{
  title: string
  value: string
  unit?: string          // 百万 | 人 | %
  help?: boolean
  helpText?: string
  trends?: { name: string; value: string; trend: 'up' | 'down' }[]
}
```

---

### 4.3 跑冒滴漏巡检概览

入口：「查看跑冒滴漏任务」→ 任务中心。

#### 4.3.1 本月巡检识别风险及处置情况

KPI：识别异常、异常人数、命中异常、处置闭环率、挽损金额。

```ts
{ title: string; value: string; unit?: string; tone?: 'default' | 'success' | 'danger' }
```

处置分组：

- 自动拦截：异常任务数、异常人数
- 人工处理：异常任务数、异常人数

右侧为多柱图：`{ seed, labels }`。

#### 4.3.2 下探 Tab

`drillTab`：`org` 组织下探 / `scene` 场景下探 / `person` 高风险人员。

**组织下探**

默认展示 5 条，可「查看更多组织」。行操作打开「组织全量明细」抽屉。

```ts
{
  rank: number
  title: string
  value: string
  unit: string
  splits: { title: string; label: string; impact: string; value: string; unit: string }[]
  children: {
    index: number
    title: string
    metrics: { title: string; value: string; unit?: string }[]  // 异常任务数、异常人数、挽损金额
  }[]
}
```

**场景下探**

场景卡：`onjob` 在岗异常 / `efficiency` 效率异常 / `input` 投入异常 / `leave` 离职风险 / `bonus` 奖金套取风险。

```ts
{ id: string; title: string; count: number; impact: string }
```

场景排行：

```ts
{
  rank: number
  title: string
  metrics: { label: string; value: string; unit?: string; tone?: string }[]
  children?: {
    index: number
    title: string
    extraLabel: string
    extraTone: string
    extraShowIcon: boolean
    metrics: { title: string; value: string; unit?: string; tone?: string }[]
  }[]
}
```

导出 CSV 字段：异常编号、组织、岗位、涉及人数、预计影响、状态。

源表明细：

```ts
{ no: string; org: string; post: string; people: number; impact: string; status: string }
```

**高风险人员**

默认 10 条；「查看全部人员明细（100条）」打开抽屉。点击人员打开「异常明细」。

```ts
{
  index: number
  title: string                 // 脱敏姓名
  label: string                 // 异常类型
  extraLabel: string            // n条异常
  desc: string                  // 组织路径
  metrics: { title: string; value: string; unit?: string; tone?: string }[]
}
```

---

## 5. 抽屉需求

抽屉叠在驾驶舱/大屏之上，互斥打开（打开一个关闭其他）。

### 5.1 全量指标明细

- 入口：人力概览「查看指标详情」
- 标题：全量指标明细
- 宽度：800px
- 可展开树表，名称列「指标名称」

列：

| key | 标题 |
| --- | --- |
| ytd | `{周期}YTD` |
| ytdYoy | YTD同比 |
| month | `{周期}当月` |
| monthYoy | 当月同比 |
| monthMom | 当月环比 |

行（可含子级）：

```ts
{
  key?: string
  name: string
  ytd: string
  ytdYoy: string
  month: string
  monthYoy: string
  monthMom: string
  children?: rows
}
```

固定层级：综合人工成本费率（固定/变动）、综合人工成本（固定/变动）、收入、单位收入、人效。

### 5.2 综合人工成本

- 入口：人力概览「查看综合人工成本」
- 标题：综合人工成本
- 宽度：1280px
- 周期：YTD 指标 / 当月指标 / MTD 预测
- 可展开科目表 + 科目趋势图

列分组：人工成本（万元）、人均人工成本、人数（万）。每组 3 列：当期值、同比变化额、同比变化比例。

```ts
{
  name: string
  costMonth: string
  costDelta: string
  costRate: string
  unitMonth: string
  unitDelta: string
  unitRate: string
  headMonth: string
  headDelta: string
  headRate: string
  children?: rows
}
```

科目树：综合人工成本 → 固定人工成本（基本工资、社保公积金、奖金激励、员工福利）→ 变动人工成本（绩效工资、招聘教育及补偿、奖金激励、劳务外包）。

趋势图：选择科目；图例 26年 / 25年；横轴 1–12 月。

### 5.3 异常明细（单人）

- 入口：高风险人员卡片
- 标题：异常明细
- 宽度：1000px
- 名称列：员工姓名
- 行数 = 该人员 `extraLabel` 中的异常条数

| key | 标题 |
| --- | --- |
| erp | ERP |
| role | 员工岗位 |
| level | 员工职级 |
| org | 所在机构 |
| hrbp | 员工HRBP |
| metric | 异常指标（二级） |

```ts
{
  name: string
  erp: string
  role: string
  level: string
  org: string
  hrbp: string
  metric: string
}
```

### 5.4 组织全量明细

- 入口：组织下探排行「导出/查看全量」
- 宽度：1000px
- 面包屑下钻：运营部 → 二级组织 → 三级组织 → 四级组织 → 人员明细
- 仅一级展示汇总卡：异常明细数、预计挽损金额
- 非人员层行操作「下探」；人员层无下探
- 底部「导出全量明细」导出当前层 CSV

组织层列：

| key | 标题 |
| --- | --- |
| orgName | 二级/三级/四级组织 |
| exceptionCount | 异常明细数 |
| interceptPeople | 拦截人数 |
| recoverAmount | 挽损金额 |
| ratio | 占比 |

人员层列：员工姓名、ERP、员工岗位、员工职级、所在机构、员工HRBP、异常指标（二级）。

```ts
{
  dept: string
  region: string
  exceptionCount: string
  exceptionUnit: '条'
  recoverAmount: string
  recoverUnit: '万'
  levels: {
    key: 'l2' | 'l3' | 'l4' | 'person'
    label: string
    nameTitle: string
    columns: { key: string; title: string; tone?: boolean }[]
    rows: object[]
  }[]
}
```

### 5.5 AI 报告

- 入口：主题卡「AI报告」查看
- 标题：报告名称
- 宽度：720px
- 正文区占位；确认按钮「下载报告」下载 txt

下载内容：

```ts
{
  title: string
  fileName: string
  summary: string
  sections: { title: string; paragraphs: string[] }[]
}
```

固定章节：核心结论、风险与机会、行动建议。主题决定文案口径（人力成本 / 跑冒滴漏）。

### 5.6 全部人员明细

- 入口：高风险人员「查看全部人员明细（100条）」
- 标题：全部人员明细
- 宽度：1000px
- 名称列：排序
- 列：员工姓名 + 与异常明细相同的人员字段（异常指标标题为「异常指标」）
- 100 条

---

## 6. 任务中心

独立页面，不走看板筛选。从人力概览、跑冒滴漏概览的「查看任务」进入。

### 6.1 汇总卡

| key | label | 说明 |
| --- | --- | --- |
| processing | 处理中 | 数量 |
| done | 已处理 | 数量 |
| overdue | 已逾期 | 数量 |
| mine | 本人任务 | 数量 |
| recover | 挽损金额 | `{ prefix, value, unit }`，如 ¥3,420 万，危险色 |

```ts
{ key: string; label: string; value: number; tone?: string }
{ label: string; prefix: string; value: string; unit: string }
```

### 6.2 筛选

点击「查询」后生效，并重置到第 1 页。

| 字段 | 控件 | 取值 |
| --- | --- | --- |
| scene | 下拉 | 全部 / 薪酬竞争力 / 人员配置 / 跑冒滴漏 / 考核分析 |
| overdue | 下拉 | 全部 / 是 / 否 |
| handler | 输入 | 模糊匹配处理人 |
| dateRange | 日期范围 | `yyyy-MM-dd`，按创建时间过滤 |

### 6.3 任务列表

每页 5 条，上一页/下一页。行操作「查看详情」（当前提示任务 ID）。

```ts
{
  id: string                 // T-81001
  name: string
  dept: string
  scene: '薪酬竞争力' | '人员配置' | '跑冒滴漏' | '考核分析'
  module: string             // 单价测算中心 / 编制管理 / 任务中心执行 / 考核看板
  measureType: '审批确认' | '执行' | '通知'
  handler: string            // 姓名(erp)
  createdAt: string          // yyyy-MM-dd
  dueAt: string
  overdue: boolean
  recover: string            // ¥760万
  status: '处理中' | '已处理'
}
```

展示规则：

- 任务名称：上行任务 ID，下行任务标题
- 诊断场景按类型着色：薪酬竞争力 info、人员配置 success、跑冒滴漏 error、考核分析 purple
- 是否逾期：是红色 / 否灰色
- 状态：处理中 warning、已处理 success

---

## 7. 展示层总结构

```ts
type Trend = 'up' | 'down'
type Tone = 'default' | 'success' | 'danger' | 'error' | 'warning' | 'primary' | 'purple' | 'info' | 'normal'

interface Indicator {
  name: string
  value: string
  trend: Trend
}

interface Metric {
  title: string
  value: string
  unit?: string
  tone?: Tone
  trends?: Indicator[]
}

interface ChartView {
  seed: number
  labels: string[]
}

interface ProductView {
  filter: Filter
  themeCards?: ThemeCard[]
  labor?: LaborBoard
  leak?: LeakBoard
  drawers: DrawerSet
  taskCenter: TaskCenter
}
```

图表当前以 `seed + labels` 驱动演示曲线，不落真实 series。正式接口需补 `series: { name, color?, points: number[] }[]`。

---

## 8. 交互一览

| 位置 | 动作 | 结果 |
| --- | --- | --- |
| 顶栏成本诊断 | 进入驾驶舱 | `/cockpit` |
| 顶栏任务中心 | 进入任务列表 | `/task-center` |
| 主题卡切换 | 切换 labor / leak | 下方面板切换 |
| 主题卡 AI 报告 | 查看 / 下载 | 打开 AI 报告抽屉 / 下载 txt |
| 人力「查看综合人工成本」 | 打开抽屉 | 综合人工成本 |
| 人力「查看指标详情」 | 打开抽屉 | 全量指标明细 |
| 人力/跑冒滴漏「查看任务」 | 跳转 | 任务中心 |
| 组织排行导出 | 打开抽屉 | 组织全量明细，可下钻导出 |
| 场景排行导出 | 下载 CSV | 当前场景明细 |
| 人员卡点击 | 打开抽屉 | 该人异常明细 |
| 查看全部人员 | 打开抽屉 | 100 条人员明细 |
| 任务「查看详情」 | 提示 | 当前仅消息提示，无任务详情页 |

抽屉互斥：打开任一明细时关闭其余抽屉。

---

## 9. 状态与枚举

| 枚举 | 取值 |
| --- | --- |
| 组织层级 | hq / province / line / c1 |
| 主题 | labor / leak |
| 人力矩阵口径 | ytd / month |
| 人力趋势周期 | year / month |
| 人力趋势指标 | rate / cost / income |
| 地图切片 | province / dept |
| 地图层级 | l1l2 / l3l4 / l5 |
| 预算类型 | cost / hc |
| 下探 Tab | org / scene / person |
| 场景 | onjob / efficiency / input / leave / bonus |
| 任务场景 | 薪酬竞争力 / 人员配置 / 跑冒滴漏 / 考核分析 |
| 任务状态 | 处理中 / 已处理 |
| 举措类型 | 审批确认 / 执行 / 通知 |
| 人员异常指标 | 低收入、持续低效、工时异常、补贴核验异常、在岗时长不足、排班冲突、考勤异常、绩效偏低、加班费异常、津贴重复领取、岗位匹配异常、编制占用异常 |

---

## 10. 范围说明

1. 本文档描述**页面展示所需数据结构与交互**，不约定后端接口路径。
2. 导航中「用工管理 / 考勤管理 / 薪酬管理 / 组织与基础数据」及成本诊断占位二级菜单不在本期范围。
3. 任务详情页未实现，仅列表「查看详情」占位。
4. AI 报告抽屉正文为占位，下载文件含摘要与三章节建议。
5. 图表为演示种子数据，正式环境需替换为真实时间序列。
)

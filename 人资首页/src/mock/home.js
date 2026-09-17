/** 首页演示数据（对齐原型） */

export const homeNoticeItems = [
  {
    key: 'n1',
    title: '2026 年 8 月薪酬核算关键节点提醒',
    tag: { text: '紧急', tone: 'error', variant: 'solid' },
    time: '08-16'
  },
  {
    key: 'n2',
    title: '高峰期临时用工合规校验要求',
    tag: { text: '重要', tone: 'warning', variant: 'solid' },
    time: '08-15'
  },
  {
    key: 'n3',
    title: 'Q3 一线员工福利政策更新说明',
    tag: { text: '通知', tone: 'info', variant: 'solid' },
    time: '08-14'
  },
  {
    key: 'n4',
    title: '单价调整审批材料口径说明',
    tag: { text: '重要', tone: 'warning', variant: 'solid' },
    time: '08-12'
  }
]

export const homeDomainCards = [
  {
    key: 'labor',
    title: '用工与招聘',
    subtitle: '编制 / 用工结构 / 招聘引进',
    iconName: '架构',
    enterHash: '/labor-mgmt',
    metrics: [
      { title: '在招职位', value: '128', iconName: '检索' },
      { title: '待入职', value: '42', iconName: '架构' }
    ],
    tasks: [
      { title: '广东省区仓储分拣用工结构复核', status: '待确认', tone: 'info' },
      { title: '旺季临时用工社招 Offer 审批', status: '待审批', tone: 'warning' }
    ]
  },
  {
    key: 'attend',
    title: '考勤与排班',
    subtitle: '排班 / 工时 / 考勤校验',
    iconName: '台历',
    enterHash: '/attend',
    metrics: [
      { title: '排班待确认', value: '6', iconName: '台历' },
      { title: '考勤异常', value: '12', iconName: '预警' }
    ],
    tasks: [
      { title: '江苏省区 6 个场地排班供需复核', status: '待确认', tone: 'info' },
      { title: '苏南夜班补贴异常核验', status: '即将逾期', tone: 'error' }
    ]
  },
  {
    key: 'pay',
    title: '薪酬与绩效',
    subtitle: '单价 / 保底 / KPI 激励',
    iconName: '金融',
    enterHash: '/pay',
    metrics: [
      { title: '待审批', value: '3', iconName: '权限' },
      { title: '待测算', value: '2', iconName: '计算器' }
    ],
    tasks: [
      { title: '江苏省区末端单价调整审批', status: '待审批', tone: 'warning' },
      { title: '分拣 KPI 与激励规则复核', status: '待确认', tone: 'info' }
    ]
  },
  {
    key: 'cost',
    title: '成本与任务',
    subtitle: '成本诊断 / 跑冒滴漏 / 任务闭环',
    iconName: '文档',
    enterHash: '/cockpit',
    metrics: [
      { title: '待我处理', value: '9', iconName: '文档' },
      { title: '待验证收益', value: '¥760', unit: '万', iconName: '金融' }
    ],
    tasks: [
      { title: '江苏省区末端策略收益验证', status: '待生成', tone: 'info' },
      { title: '苏南补贴异常专项核验', status: '待核验', tone: 'warning' }
    ]
  }
]

export const homeQuickApps = [
  { key: 'hr-desk', label: 'HR 工作台', iconName: '数据' },
  { key: 'hr-portal', label: '人事门户', iconName: '架构' },
  { key: 'wutong', label: '梧桐系统', iconName: '层级' },
  { key: 'perf', label: '绩效系统', iconName: '折线' }
]

export const homeHelpGuides = [
  {
    key: 'h1',
    index: '01',
    title: '薪酬核算日历',
    desc: '查看本周期关键节点与交付物'
  },
  {
    key: 'h2',
    index: '02',
    title: '单价测算指引',
    desc: '了解校验、审批与生效流程'
  },
  {
    key: 'h3',
    index: '03',
    title: '数据查询权限说明',
    desc: '薪酬数据范围与审计要求'
  },
  {
    key: 'h4',
    index: '04',
    title: '问题反馈与支持',
    desc: '提交薪酬核算及数据问题'
  }
]

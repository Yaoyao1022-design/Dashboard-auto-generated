export const leakThemeCard = {
  key: 'leak',
  title: '跑冒滴漏分析',
  headerActionText: 'AI报告',
  summary:
    '本月累计触发异常 128 条（其中线上监控异常识别到 100 条，系统拦截异常 28 条），预计挽损金额 ¥3,420万，整体处理闭环率 82.1%。当前高优异常中，江苏单价审批与苏南补贴核验为本周必须闭环事项。',
  metrics: [
    {
      title: '26年08月YTD',
      value: '1,425',
      unit: '条',
      trends: [
        { name: '挽损', value: '6.33%', trend: 'up' },
        { name: '闭环率', value: '82.1%', trend: 'down' }
      ]
    },
    {
      title: '26年08月',
      value: '128',
      unit: '条',
      trends: [
        { name: '挽损', value: '6.33%', trend: 'up' },
        { name: '闭环率', value: '82.1%', trend: 'down' }
      ]
    }
  ]
}

export const leakInspectKpis = [
  { title: '识别异常', value: '34,222', unit: '条' },
  { title: '异常人数', value: '128', unit: '人' },
  { title: '命中异常', value: '128', unit: '条' },
  { title: '处置闭环率', value: '74.2%', unit: '' },
  { title: '挽损金额', value: '9,888', unit: '万元', tone: 'danger' }
]

export const leakInspectAuto = [
  { title: '异常任务数', value: '86', unit: '条' },
  { title: '异常人数', value: '620', unit: '人' }
]

export const leakInspectManual = [
  { title: '异常任务数', value: '42', unit: '条' },
  { title: '异常人数', value: '30', unit: '人' }
]

export const leakSceneCards = [
  { id: 'onjob', title: '在岗异常', count: 26, impact: '412' },
  { id: 'efficiency', title: '效率异常', count: 34, impact: '432' },
  { id: 'input', title: '投入异常', count: 15, impact: '52' },
  { id: 'leave', title: '离职风险', count: 29, impact: '123' },
  { id: 'bonus', title: '奖金套取风险', count: 10, impact: '230' }
]

export const leakOrgRankItems = [
  {
    rank: 1,
    title: '江苏运营部',
    value: '128',
    unit: '条',
    splits: [
      { title: '在岗异常', label: '高', impact: '412', value: '48', unit: '条' },
      { title: '效率异常', label: '中', impact: '186', value: '36', unit: '条' },
      { title: '投入异常', label: '低', impact: '52', value: '18', unit: '条' }
    ],
    children: [
      { index: 1, title: '苏南分部', metrics: [{ title: '异常任务数', value: '42', unit: '条' }, { title: '异常人数', value: '28', unit: '人' }, { title: '挽损金额', value: '760', unit: '万' }] },
      { index: 2, title: '苏北分部', metrics: [{ title: '异常任务数', value: '31', unit: '条' }, { title: '异常人数', value: '19', unit: '人' }, { title: '挽损金额', value: '420', unit: '万' }] }
    ]
  },
  {
    rank: 2,
    title: '广东转运中心',
    value: '96',
    unit: '条',
    splits: [
      { title: '在岗异常', label: '中', impact: '210', value: '32', unit: '条' },
      { title: '效率异常', label: '高', impact: '330', value: '41', unit: '条' },
      { title: '离职风险', label: '中', impact: '88', value: '23', unit: '条' }
    ],
    children: [
      { index: 1, title: '广州分拣', metrics: [{ title: '异常任务数', value: '38', unit: '条' }, { title: '异常人数', value: '22', unit: '人' }, { title: '挽损金额', value: '510', unit: '万' }] }
    ]
  },
  {
    rank: 3,
    title: '浙江仓储部',
    value: '84',
    unit: '条',
    splits: [
      { title: '投入异常', label: '高', impact: '268', value: '29', unit: '条' },
      { title: '在岗异常', label: '中', impact: '140', value: '27', unit: '条' },
      { title: '奖金套取风险', label: '低', impact: '36', value: '8', unit: '条' }
    ],
    children: [
      { index: 1, title: '杭州仓', metrics: [{ title: '异常任务数', value: '24', unit: '条' }, { title: '异常人数', value: '16', unit: '人' }, { title: '挽损金额', value: '280', unit: '万' }] }
    ]
  },
  {
    rank: 4,
    title: '北京城配',
    value: '71',
    unit: '条',
    splits: [
      { title: '效率异常', label: '中', impact: '96', value: '25', unit: '条' },
      { title: '离职风险', label: '高', impact: '154', value: '30', unit: '条' },
      { title: '在岗异常', label: '低', impact: '40', value: '16', unit: '条' }
    ],
    children: [
      { index: 1, title: '亦庄站点', metrics: [{ title: '异常任务数', value: '18', unit: '条' }, { title: '异常人数', value: '11', unit: '人' }, { title: '挽损金额', value: '190', unit: '万' }] }
    ]
  },
  {
    rank: 5,
    title: '上海末端',
    value: '63',
    unit: '条',
    splits: [
      { title: '在岗异常', label: '中', impact: '120', value: '22', unit: '条' },
      { title: '投入异常', label: '中', impact: '74', value: '19', unit: '条' },
      { title: '效率异常', label: '低', impact: '32', value: '12', unit: '条' }
    ],
    children: [
      { index: 1, title: '浦东网点', metrics: [{ title: '异常任务数', value: '15', unit: '条' }, { title: '异常人数', value: '9', unit: '人' }, { title: '挽损金额', value: '160', unit: '万' }] }
    ]
  },
  {
    rank: 6,
    title: '四川供应链',
    value: '52',
    unit: '条',
    splits: [
      { title: '离职风险', label: '中', impact: '88', value: '20', unit: '条' },
      { title: '在岗异常', label: '低', impact: '41', value: '14', unit: '条' },
      { title: '奖金套取风险', label: '中', impact: '60', value: '18', unit: '条' }
    ],
    children: [
      { index: 1, title: '成都枢纽', metrics: [{ title: '异常任务数', value: '12', unit: '条' }, { title: '异常人数', value: '8', unit: '人' }, { title: '挽损金额', value: '110', unit: '万' }] }
    ]
  },
  {
    rank: 7,
    title: '湖北冷链',
    value: '44',
    unit: '条',
    splits: [
      { title: '效率异常', label: '高', impact: '132', value: '21', unit: '条' },
      { title: '投入异常', label: '中', impact: '58', value: '13', unit: '条' },
      { title: '在岗异常', label: '低', impact: '22', value: '10', unit: '条' }
    ],
    children: [
      { index: 1, title: '武汉冷仓', metrics: [{ title: '异常任务数', value: '11', unit: '条' }, { title: '异常人数', value: '7', unit: '人' }, { title: '挽损金额', value: '96', unit: '万' }] }
    ]
  },
  {
    rank: 8,
    title: '国际关务',
    value: '31',
    unit: '条',
    splits: [
      { title: '投入异常', label: '中', impact: '70', value: '12', unit: '条' },
      { title: '在岗异常', label: '低', impact: '28', value: '9', unit: '条' },
      { title: '效率异常', label: '低', impact: '18', value: '10', unit: '条' }
    ],
    children: [
      { index: 1, title: '口岸组', metrics: [{ title: '异常任务数', value: '8', unit: '条' }, { title: '异常人数', value: '5', unit: '人' }, { title: '挽损金额', value: '64', unit: '万' }] }
    ]
  }
]

const sceneRankMetrics = [
  { label: '异常任务数', value: '86', unit: '条' },
  { label: '异常人数', value: '62', unit: '人' },
  { label: '闭环率', value: '82.1%', tone: 'success' },
  { label: '挽损金额', value: '760', unit: '万' }
]

export const leakSceneRankItems = {
  onjob: [
    {
      rank: 1,
      title: '江苏末端-在岗时长不足',
      metrics: sceneRankMetrics,
      children: [
        { index: 1, title: '苏南网点A', extraLabel: '导出', extraTone: 'error', extraShowIcon: true, metrics: [{ title: '异常任务数', value: '18', unit: '条' }, { title: '异常人数', value: '12', unit: '人' }, { title: '挽损金额', value: '210', unit: '万', tone: 'danger' }] },
        { index: 2, title: '苏北网点B', extraLabel: '导出', extraTone: 'error', extraShowIcon: true, metrics: [{ title: '异常任务数', value: '11', unit: '条' }, { title: '异常人数', value: '8', unit: '人' }, { title: '挽损金额', value: '96', unit: '万' }] }
      ]
    },
    {
      rank: 2,
      title: '广东转运-排班冲突',
      metrics: sceneRankMetrics,
      children: [
        { index: 1, title: '广州夜班组', extraLabel: '导出', extraTone: 'error', extraShowIcon: true, metrics: [{ title: '异常任务数', value: '14', unit: '条' }, { title: '异常人数', value: '9', unit: '人' }, { title: '挽损金额', value: '128', unit: '万' }] }
      ]
    },
    {
      rank: 3,
      title: '浙江仓储-考勤异常',
      metrics: sceneRankMetrics
    }
  ],
  efficiency: [
    { rank: 1, title: '上海末端-持续低效', metrics: sceneRankMetrics, children: [{ index: 1, title: '浦东一线', extraLabel: '导出', extraTone: 'error', extraShowIcon: true, metrics: [{ title: '异常任务数', value: '22', unit: '条' }, { title: '异常人数', value: '16', unit: '人' }, { title: '挽损金额', value: '188', unit: '万' }] }] },
    { rank: 2, title: '北京城配-绩效偏低', metrics: sceneRankMetrics }
  ],
  input: [
    { rank: 1, title: '四川供应链-加班费异常', metrics: sceneRankMetrics },
    { rank: 2, title: '湖北冷链-津贴重复领取', metrics: sceneRankMetrics }
  ],
  leave: [
    { rank: 1, title: '财务结算-低收入预警', metrics: sceneRankMetrics },
    { rank: 2, title: '科技运维-岗位匹配异常', metrics: sceneRankMetrics }
  ],
  bonus: [
    { rank: 1, title: '省区职能-补贴核验异常', metrics: sceneRankMetrics },
    { rank: 2, title: '国际关务-奖金套取', metrics: sceneRankMetrics }
  ]
}

export const leakSceneSourceRows = [
  { no: 'EX-10021', org: '江苏末端', post: '揽收员', people: 12, impact: '210万', status: '处理中' },
  { no: 'EX-10022', org: '广东转运', post: '分拣员', people: 9, impact: '128万', status: '已处理' },
  { no: 'EX-10023', org: '浙江仓储', post: '仓管', people: 6, impact: '64万', status: '处理中' },
  { no: 'EX-10024', org: '上海末端', post: '配送员', people: 8, impact: '96万', status: '已逾期' },
  { no: 'EX-10025', org: '北京城配', post: '调度', people: 4, impact: '41万', status: '处理中' }
]

const personMetrics = [
  { title: '预计影响', value: '86', unit: '万', tone: 'danger' }
]

const personSeed = [
  { title: '张*伟', label: '在岗异常', extraLabel: '3条异常', desc: '江苏 / 末端 / 运营部' },
  { title: '李*强', label: '效率异常', extraLabel: '2条异常', desc: '广东 / 转运 / 分拣中心' },
  { title: '王*敏', label: '投入异常', extraLabel: '4条异常', desc: '浙江 / 仓储 / 杭州仓' },
  { title: '赵*杰', label: '离职风险', extraLabel: '1条异常', desc: '北京 / 城配 / 亦庄' },
  { title: '刘*芳', label: '奖金套取风险', extraLabel: '2条异常', desc: '上海 / 末端 / 浦东' },
  { title: '陈*军', label: '在岗异常', extraLabel: '5条异常', desc: '四川 / 供应链 / 成都枢纽' },
  { title: '杨*丽', label: '效率异常', extraLabel: '2条异常', desc: '湖北 / 冷链 / 武汉冷仓' },
  { title: '黄*涛', label: '投入异常', extraLabel: '3条异常', desc: '江苏 / 末端 / 苏南' },
  { title: '周*娜', label: '离职风险', extraLabel: '1条异常', desc: '广东 / 转运 / 广州' },
  { title: '吴*斌', label: '在岗异常', extraLabel: '2条异常', desc: '浙江 / 仓储 / B2C仓' }
]

const exceptionMetrics = ['低收入', '持续低效', '工时异常', '补贴核验异常', '在岗时长不足', '排班冲突', '考勤异常', '绩效偏低', '加班费异常', '津贴重复领取', '岗位匹配异常', '编制占用异常']

function parseExceptionCount(extraLabel) {
  const match = String(extraLabel || '').match(/(\d+)/)
  return Math.max(1, Number(match && match[1]) || 1)
}

export const leakPersonItems = personSeed.map((item, index) => ({
  index: index + 1,
  ...item,
  extraTone: 'error',
  metrics: [{ ...personMetrics[0], value: String(86 - index * 6) }]
}))

export function buildPersonList(count) {
  const rows = []
  for (let i = 0; i < count; i += 1) {
    const seed = personSeed[i % personSeed.length]
    rows.push({
      index: i + 1,
      name: seed.title.replace('*', i > 9 ? String(i % 10) : '*'),
      erp: `erp${10001 + i}`,
      role: ['揽收员', '分拣员', '仓管', '调度', '配送员'][i % 5],
      level: ['P1', 'P2', 'P3', 'P4'][i % 4],
      org: seed.desc,
      hrbp: ['周敏', '李倩', '王安'][i % 3],
      metric: exceptionMetrics[i % exceptionMetrics.length],
      extraLabel: seed.extraLabel,
      title: seed.title,
      label: seed.label,
      desc: seed.desc
    })
  }
  return rows
}

export const leakPersonFullRows = buildPersonList(100)

export function buildPersonExceptionRows(person) {
  const count = parseExceptionCount(person && person.extraLabel)
  const name = (person && (person.title || person.name)) || '张*伟'
  const org = (person && (person.desc || person.org)) || '江苏 / 末端 / 运营部'
  const rows = []
  for (let i = 0; i < count; i += 1) {
    rows.push({
      name,
      erp: `erp${88001 + i}`,
      role: ['揽收员', '分拣员', '仓管'][i % 3],
      level: ['P2', 'P3', 'P4'][i % 3],
      org,
      hrbp: '周敏',
      metric: exceptionMetrics[i % exceptionMetrics.length]
    })
  }
  return rows
}

export const personExceptionColumns = [
  { key: 'erp', title: 'ERP' },
  { key: 'role', title: '员工岗位' },
  { key: 'level', title: '员工职级' },
  { key: 'org', title: '所在机构' },
  { key: 'hrbp', title: '员工HRBP' },
  { key: 'metric', title: '异常指标（二级）' }
]

export const personListColumns = [
  { key: 'staffName', title: '员工姓名' },
  { key: 'erp', title: 'ERP' },
  { key: 'role', title: '员工岗位' },
  { key: 'level', title: '员工职级' },
  { key: 'org', title: '所在机构' },
  { key: 'hrbp', title: '员工HRBP' },
  { key: 'metric', title: '异常指标' }
]

export const orgFullDetail = {
  dept: '运营部',
  region: '江苏',
  exceptionCount: '128',
  exceptionUnit: '条',
  recoverAmount: '3,420',
  recoverUnit: '万',
  levels: [
    {
      key: 'l2',
      label: '运营部',
      nameTitle: '二级组织',
      columns: [
        { key: 'exceptionCount', title: '异常明细数' },
        { key: 'interceptPeople', title: '拦截人数' },
        { key: 'recoverAmount', title: '挽损金额' },
        { key: 'ratio', title: '占比', tone: true }
      ],
      rows: [
        { name: '苏南分部', exceptionCount: '42条', interceptPeople: '28', recoverAmount: '760万', ratio: '32.8%' },
        { name: '苏北分部', exceptionCount: '31条', interceptPeople: '19', recoverAmount: '420万', ratio: '24.2%' },
        { name: '苏中分部', exceptionCount: '27条', interceptPeople: '16', recoverAmount: '380万', ratio: '21.1%' }
      ]
    },
    {
      key: 'l3',
      label: '苏南分部',
      nameTitle: '三级组织',
      columns: [
        { key: 'exceptionCount', title: '异常明细数' },
        { key: 'interceptPeople', title: '拦截人数' },
        { key: 'recoverAmount', title: '挽损金额' },
        { key: 'ratio', title: '占比', tone: true }
      ],
      rows: [
        { name: '无锡网点', exceptionCount: '18条', interceptPeople: '12', recoverAmount: '210万', ratio: '42.8%' },
        { name: '苏州网点', exceptionCount: '14条', interceptPeople: '9', recoverAmount: '160万', ratio: '33.3%' }
      ]
    },
    {
      key: 'l4',
      label: '无锡网点',
      nameTitle: '四级组织',
      columns: [
        { key: 'exceptionCount', title: '异常明细数' },
        { key: 'interceptPeople', title: '拦截人数' },
        { key: 'recoverAmount', title: '挽损金额' },
        { key: 'ratio', title: '占比', tone: true }
      ],
      rows: [
        { name: '揽收一组', exceptionCount: '8条', interceptPeople: '6', recoverAmount: '96万', ratio: '44.4%' },
        { name: '揽收二组', exceptionCount: '6条', interceptPeople: '4', recoverAmount: '64万', ratio: '33.3%' }
      ]
    },
    {
      key: 'person',
      label: '揽收一组',
      nameTitle: '员工姓名',
      columns: [
        { key: 'erp', title: 'ERP' },
        { key: 'role', title: '员工岗位' },
        { key: 'level', title: '员工职级' },
        { key: 'org', title: '所在机构' },
        { key: 'hrbp', title: '员工HRBP' },
        { key: 'metric', title: '异常指标（二级）' }
      ],
      rows: [
        { name: '张*伟', erp: 'erp88001', role: '揽收员', level: 'P2', org: '江苏 / 末端 / 无锡', hrbp: '周敏', metric: '在岗时长不足' },
        { name: '李*强', erp: 'erp88002', role: '揽收员', level: 'P1', org: '江苏 / 末端 / 无锡', hrbp: '周敏', metric: '排班冲突' }
      ]
    }
  ]
}

export const leakAiReport = {
  title: '跑冒滴漏分析报告',
  fileName: '跑冒滴漏分析报告.txt',
  summary: '基于当前筛选条件生成的跑冒滴漏报告摘要，覆盖异常识别、处置闭环、挽损与高风险组织。',
  sections: [
    {
      title: '核心结论',
      paragraphs: [
        '本月累计触发异常 128 条，预计挽损 3,420 万，闭环率 82.1%，整体可控但仍有高优事项未闭环。',
        '江苏单价审批与苏南补贴核验是本周必须闭环的高优异常。'
      ]
    },
    {
      title: '风险与机会',
      paragraphs: [
        '高风险集中在江苏运营、广东转运等组织，在岗与效率异常贡献了主要挽损。',
        '自动拦截已覆盖部分规则，扩大规则覆盖可减少人工重复处理。'
      ]
    },
    {
      title: '行动建议',
      paragraphs: [
        '1. 对 Top 组织开展专项复盘，明确责任人与完成时间。',
        '2. 优先闭环江苏单价审批、苏南补贴核验。',
        '3. 将可自动拦截事项提升规则覆盖，压降人工处理量。'
      ]
    }
  ]
}

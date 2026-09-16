export const orgLevels = [
  { label: '物流总部', value: 'hq' },
  { label: '省区', value: 'province' },
  { label: '条线', value: 'line' },
  { label: 'C1', value: 'c1' }
]

export const provinces = ['江苏', '浙江', '广东', '北京', '上海', '四川', '湖北']
export const businessLines = ['末端', '转运', '仓储', '城配', '冷链', '国际', '供应链']
export const c1Departments = ['运营', '科技', '财务', '人力资源', '综合', '省区职能']

export const navMenuData = [
  {
    key: 'cost',
    label: '成本诊断',
    children: [{ key: 'labor-cost', label: '人力经营驾驶舱' }]
  }
]

export const laborThemeCard = {
  key: 'labor',
  title: '人力成本分析',
  headerActionText: 'AI报告',
  summary:
    '本月综合人工成本费率 6.42%（环比 +6.32% / 同比 -5.85%），较目标偏离+0.57pp，江苏末端（+0.92pp）为最大偏差来源；YTD 综合费率6.15%（同比 -0.2%），成本趋势连续数月上行，需重点关注。',
  metrics: [
    {
      title: '26年08月YTD',
      value: '6.15%',
      trends: [
        { name: '同比', value: '0.20%', trend: 'down' },
        { name: '目标差', value: '0.57pp', trend: 'up' }
      ]
    },
    {
      title: '26年08月',
      value: '6.42%',
      trends: [
        { name: '同比', value: '5.85%', trend: 'down' },
        { name: '环比', value: '6.32%', trend: 'up' }
      ]
    }
  ]
}

export const laborMatrix = [
  {
    title: '26年08月YTD',
    value: '6.15%',
    primary: true,
    variant: 'l2-t',
    trends: [{ name: '同比', value: '0.20%', trend: 'down' }]
  },
  {
    title: '固定费率',
    value: '3.42%',
    variant: 'l3-t',
    trends: [{ name: '同比', value: '0.11%', trend: 'down' }]
  },
  {
    title: '变动费率',
    value: '2.73%',
    variant: 'l3-t',
    trends: [{ name: '同比', value: '0.09%', trend: 'up' }]
  },
  {
    title: '综合人工成本',
    value: '12,123',
    unit: '亿元',
    primary: true,
    variant: 'l2-t',
    trends: [
      { name: '同比', value: '6.33%', trend: 'up' },
      { name: '环比', value: '1.20%', trend: 'down' }
    ]
  },
  {
    title: '固定人工成本',
    value: '6,541',
    unit: '亿元',
    variant: 'l3-t',
    trends: [
      { name: '同比', value: '3.10%', trend: 'up' },
      { name: '环比', value: '0.40%', trend: 'down' }
    ]
  },
  {
    title: '变动人工成本',
    value: '5,582',
    unit: '亿元',
    variant: 'l3-t',
    trends: [
      { name: '同比', value: '8.10%', trend: 'up' },
      { name: '环比', value: '2.10%', trend: 'up' }
    ]
  },
  {
    title: '收入',
    value: '56.8',
    unit: '亿元',
    primary: true,
    variant: 'l2-t',
    trends: [
      { name: '同比', value: '4.20%', trend: 'up' },
      { name: '环比', value: '1.10%', trend: 'up' }
    ]
  },
  {
    title: '单位收入',
    value: '30,000',
    unit: '元',
    variant: 'l3-t',
    trends: [
      { name: '同比', value: '2.40%', trend: 'up' },
      { name: '环比', value: '0.80%', trend: 'down' }
    ]
  },
  {
    title: '人均收入',
    value: '12,300',
    unit: '元',
    variant: 'l3-t',
    trends: [
      { name: '同比', value: '1.60%', trend: 'up' },
      { name: '环比', value: '0.30%', trend: 'down' }
    ]
  },
  {
    title: '人数',
    value: '223,344',
    unit: '人',
    primary: true,
    variant: 'l2-t',
    trends: [
      { name: '同比', value: '3.20%', trend: 'up' },
      { name: '环比', value: '0.50%', trend: 'up' }
    ]
  },
  {
    title: '人均综合人工成本',
    value: '30,000',
    unit: '元',
    variant: 'l3-t',
    trends: [
      { name: '同比', value: '1.10%', trend: 'up' },
      { name: '环比', value: '0.20%', trend: 'down' }
    ]
  },
  {
    title: '人效',
    value: '54,600',
    unit: '元',
    variant: 'l3-t',
    trends: [
      { name: '同比', value: '2.80%', trend: 'up' },
      { name: '环比', value: '0.60%', trend: 'up' }
    ]
  }
]

export const laborCityRankRows = [
  { rank: 1, name: '上海', rate: '6.42%', yoy: '+0.57%' },
  { rank: 2, name: '江苏', rate: '6.31%', yoy: '+0.42%' },
  { rank: 3, name: '浙江', rate: '6.18%', yoy: '-0.21%' },
  { rank: 4, name: '广东', rate: '5.96%', yoy: '+0.18%' },
  { rank: 5, name: '北京', rate: '5.88%', yoy: '-0.36%' },
  { rank: 6, name: '四川', rate: '5.72%', yoy: '+0.09%' }
]

export const laborDeptRateRows = [
  { rank: 1, name: '运营', tag: 'TOP1', rate: '6.86%', yoy: '+1.20%' },
  { rank: 2, name: '省区职能', tag: 'TOP2', rate: '6.42%', yoy: '+0.57%' },
  { rank: 3, name: '科技', tag: 'TOP3', rate: '5.91%', yoy: '-0.18%' },
  { rank: 4, name: '财务', rate: '5.66%', yoy: '-0.32%' },
  { rank: 5, name: '人力资源', rate: '5.41%', yoy: '+0.11%' },
  { rank: 6, name: '综合', rate: '5.28%', yoy: '-0.08%' }
]

export const laborDeptEfficiencyRows = [
  { rank: 1, name: '运营', rate: '112', yoy: '+6.2%' },
  { rank: 2, name: '科技', rate: '108', yoy: '+3.1%' },
  { rank: 3, name: '省区职能', rate: '96', yoy: '-1.4%' },
  { rank: 4, name: '财务', rate: '91', yoy: '-0.6%' },
  { rank: 5, name: '人力资源', rate: '88', yoy: '+0.8%' },
  { rank: 6, name: '综合', rate: '84', yoy: '-2.1%' }
]

export const laborRateColumns = [
  { key: 'ytdRate', title: 'YTD费率' },
  { key: 'ytdYoy', title: 'YTD费用同比', trend: true },
  { key: 'monthRate', title: '当月费率' },
  { key: 'monthYoy', title: '当月费率同比', trend: true },
  { key: 'monthMom', title: '当月费率环比', trend: true }
]

export const laborLineTableRows = [
  {
    name: '[运营]运配',
    ytdRate: '52.9%',
    ytdYoy: '-0.3%',
    monthRate: '51.3%',
    monthYoy: '-1.4%',
    monthMom: '+230.8%',
    children: [
      { name: '到仓交仓', ytdRate: '48.2%', ytdYoy: '-1.1%', monthRate: '47.6%', monthYoy: '-2.4%', monthMom: '+12.6%' },
      { name: '大件分拣装卸', ytdRate: '61.2%', ytdYoy: '+2.8%', monthRate: '59.4%', monthYoy: '+1.1%', monthMom: '+18.3%' }
    ]
  },
  {
    name: '[运营]接货仓',
    ytdRate: '44.1%',
    ytdYoy: '-30.6%',
    monthRate: '42.8%',
    monthYoy: '-18.2%',
    monthMom: '-6.4%',
    children: [
      { name: 'B2C仓', ytdRate: '49.6%', ytdYoy: '+8.4%', monthRate: '51.2%', monthYoy: '+78.3%', monthMom: '+9.1%' }
    ]
  },
  {
    name: '省区职能',
    ytdRate: '38.6%',
    ytdYoy: '+608.7%',
    monthRate: '40.2%',
    monthYoy: '+12.5%',
    monthMom: '+4.8%'
  },
  {
    name: '[科技]系统运维',
    ytdRate: '29.4%',
    ytdYoy: '-2.1%',
    monthRate: '28.8%',
    monthYoy: '-0.9%',
    monthMom: '+1.2%'
  },
  {
    name: '[财务]结算',
    ytdRate: '33.7%',
    ytdYoy: '+1.6%',
    monthRate: '34.1%',
    monthYoy: '+0.4%',
    monthMom: '-0.7%'
  },
  {
    name: '[人力]共享服务',
    ytdRate: '27.8%',
    ytdYoy: '-0.8%',
    monthRate: '27.2%',
    monthYoy: '-1.1%',
    monthMom: '+0.3%'
  }
]

export const laborDetailSummaries = {
  hq: '当月费率环比：改善最多的是[运营]到仓交仓（-40.3%），恶化最多的是[运营]大件分拣装卸（+22.5%）。',
  line: '条线费率同比：改善最多的是接货仓（-30.6%），恶化最多的是省区职能（+608.7%）。',
  province: 'YTD费率同比：改善最多的是[运营]接货仓-30.6%，恶化最多的是省区职能+608.7%；当月费率同比：改善最多的是[运营]大件分拣装卸-98.3%，恶化最多的是[运营]B2C仓+78.3%。',
  c1: 'YTD费率同比：改善最多的是[运营]接货仓-30.6%，恶化最多的是省区职能+608.7%。'
}

export const laborBudgetCards = [
  {
    title: '成本监控',
    groups: [
      {
        key: 'ytd',
        title: '26年08月YTD',
        items: [
          { title: '成本预算', value: '10.9', unit: '百万', help: true, helpText: '当期核定的成本预算金额' },
          { title: '实际已用', value: '10.3', unit: '百万' },
          { title: '预算使用率', value: '56.2%', trends: [{ name: '同比', value: '6.2%', trend: 'up' }] },
          { title: '预实偏离度', value: '-3.2%', trends: [{ name: '同比', value: '1.1%', trend: 'down' }] }
        ]
      },
      {
        key: 'month',
        title: '26年08月',
        items: [
          { title: '成本预算', value: '0.4', unit: '百万', help: true, helpText: '当期核定的成本预算金额' },
          { title: '实际已用', value: '0.6', unit: '百万' },
          { title: '预算使用率', value: '6.6%', trends: [{ name: '同比', value: '1.2%', trend: 'up' }] },
          { title: '预实偏离度', value: '-5.2%', trends: [{ name: '同比', value: '0.8%', trend: 'down' }] }
        ]
      },
      {
        key: 'mtd',
        title: '26年08月MTD',
        items: [
          { title: '成本预算', value: '0.3', unit: '百万', help: true, helpText: '当期核定的成本预算金额' },
          { title: '实际已用', value: '0.9', unit: '百万' },
          { title: '预算使用率', value: '6.2%', trends: [{ name: '同比', value: '0.9%', trend: 'up' }] },
          { title: '预实偏离度', value: '-6.2%', trends: [{ name: '同比', value: '1.4%', trend: 'down' }] }
        ]
      }
    ]
  },
  {
    title: '编制预算',
    groups: [
      {
        key: 'month',
        title: '26年08月',
        items: [
          { title: '编制预算', value: '19', unit: '人', help: true, helpText: '当期核定的编制预算人数' },
          { title: '当日在职', value: '30', unit: '人' },
          { title: '预算使用率', value: '56.2%', trends: [{ name: '同比', value: '3.2%', trend: 'up' }] },
          { title: '预实偏离度', value: '-3.2%', trends: [{ name: '同比', value: '0.6%', trend: 'down' }] }
        ]
      }
    ]
  }
]

export const laborMetricDetailColumns = [
  { key: 'ytd', title: 'YTD' },
  { key: 'ytdYoy', title: 'YTD同比', trend: true },
  { key: 'month', title: '当月' },
  { key: 'monthYoy', title: '当月同比', trend: true },
  { key: 'monthMom', title: '当月环比', trend: true }
]

export const laborMetricDetailRows = [
  {
    name: '综合人工成本费率',
    ytd: '6.15%',
    ytdYoy: '-0.20%',
    month: '6.42%',
    monthYoy: '-5.85%',
    monthMom: '+6.32%',
    children: [
      { name: '固定人工成本费率', ytd: '3.42%', ytdYoy: '-0.11%', month: '3.51%', monthYoy: '-2.10%', monthMom: '+1.40%' },
      { name: '变动人工成本费率', ytd: '2.73%', ytdYoy: '+0.09%', month: '2.91%', monthYoy: '+1.20%', monthMom: '+4.80%' }
    ]
  },
  {
    name: '综合人工成本',
    ytd: '61.9亿元',
    ytdYoy: '+4.4%',
    month: '12,123亿元',
    monthYoy: '+6.33%',
    monthMom: '-1.20%',
    children: [
      { name: '固定人工成本', ytd: '27.4亿元', ytdYoy: '+0.0%', month: '6,541亿元', monthYoy: '+3.10%', monthMom: '-0.40%' },
      { name: '变动人工成本', ytd: '34.5亿元', ytdYoy: '+8.1%', month: '5,582亿元', monthYoy: '+8.10%', monthMom: '+2.10%' }
    ]
  },
  {
    name: '收入',
    ytd: '120.7亿元',
    ytdYoy: '+3.2%',
    month: '56.8亿元',
    monthYoy: '+4.20%',
    monthMom: '+1.10%'
  },
  {
    name: '单位收入',
    ytd: '11.9元',
    ytdYoy: '+1.1%',
    month: '30,000元',
    monthYoy: '+2.40%',
    monthMom: '-0.80%'
  },
  {
    name: '人效',
    ytd: '70.2单/人/天',
    ytdYoy: '+2.8%',
    month: '54,600元',
    monthYoy: '+2.80%',
    monthMom: '+0.60%'
  }
]

export const laborCostColumnGroups = [
  { title: '人工成本（万元）', span: 3 },
  { title: '人均人工成本', span: 3 },
  { title: '人数（万）', span: 3 }
]

export const laborCostColumns = [
  { key: 'costMonth', title: '当期值' },
  { key: 'costDelta', title: '同比变化额' },
  { key: 'costRate', title: '同比变化比例', trend: true },
  { key: 'unitMonth', title: '当期值' },
  { key: 'unitDelta', title: '同比变化额' },
  { key: 'unitRate', title: '同比变化比例', trend: true },
  { key: 'headMonth', title: '当期值' },
  { key: 'headDelta', title: '同比变化额' },
  { key: 'headRate', title: '同比变化比例', trend: true }
]

export const laborCostBreakdownRows = [
  {
    name: '综合人工成本',
    costMonth: '592395.1万',
    costDelta: '24977.8万',
    costRate: '4.4%',
    unitMonth: '12439.0',
    unitDelta: '138.5',
    unitRate: '1.1%',
    headMonth: '47.67',
    headDelta: '1.57',
    headRate: '3.2%'
  },
  {
    name: '固定人工成本',
    costMonth: '259982.3万',
    costDelta: '70.0万',
    costRate: '0.0%',
    unitMonth: '5459.3',
    unitDelta: '-175.3',
    unitRate: '-3.1%',
    headMonth: '45.17',
    headDelta: '0.67',
    headRate: '1.4%',
    children: [
      { name: '基本工资', costMonth: '136877.5万', costDelta: '6033.7万', costRate: '4.6%', unitMonth: '2874.3', unitDelta: '37.7', unitRate: '1.3%', headMonth: '--', headDelta: '--', headRate: '--' },
      { name: '社保公积金', costMonth: '90987.8万', costDelta: '2767.9万', costRate: '3.1%', unitMonth: '1910.6', unitDelta: '-1.9', unitRate: '-0.1%', headMonth: '--', headDelta: '--', headRate: '--' },
      { name: '奖金激励', costMonth: '20070.9万', costDelta: '-5988.7万', costRate: '-23.0%', unitMonth: '421.5', unitDelta: '-143.5', unitRate: '-25.4%', headMonth: '--', headDelta: '--', headRate: '--' },
      { name: '员工福利', costMonth: '12045.8万', costDelta: '2080.7万', costRate: '20.9%', unitMonth: '252.9', unitDelta: '36.9', unitRate: '17.1%', headMonth: '--', headDelta: '--', headRate: '--' }
    ]
  },
  {
    name: '变动人工成本',
    costMonth: '332412.8万',
    costDelta: '24907.6万',
    costRate: '8.1%',
    unitMonth: '6980.3',
    unitDelta: '313.9',
    unitRate: '4.7%',
    headMonth: '45.17',
    headDelta: '0.67',
    headRate: '1.4%',
    children: [
      { name: '绩效工资', costMonth: '294419.9万', costDelta: '15970.0万', costRate: '5.7%', unitMonth: '6183.8', unitDelta: '145.9', unitRate: '2.4%', headMonth: '--', headDelta: '--', headRate: '--' },
      { name: '招聘教育及补偿', costMonth: '-13386.6万', costDelta: '-3403.9万', costRate: '-34.1%', unitMonth: '-281.1', unitDelta: '-64.7', unitRate: '29.9%', headMonth: '--', headDelta: '--', headRate: '--' },
      { name: '奖金激励', costMonth: '1914.5万', costDelta: '838.0万', costRate: '77.9%', unitMonth: '40.2', unitDelta: '16.9', unitRate: '72.3%', headMonth: '--', headDelta: '--', headRate: '--' },
      { name: '劳务外包', costMonth: '2136.6万', costDelta: '-1515.4万', costRate: '-41.5%', unitMonth: '44.9', unitDelta: '-34.3', unitRate: '-43.3%', headMonth: '--', headDelta: '--', headRate: '--' }
    ]
  }
]

export const laborCostSubjectOptions = [
  { label: '综合人工成本', value: '综合人工成本' },
  { label: '固定人工成本', value: '固定人工成本' },
  { label: '变动人工成本', value: '变动人工成本' },
  { label: '基本工资', value: '基本工资' },
  { label: '社保公积金', value: '社保公积金' },
  { label: '绩效工资', value: '绩效工资' },
  { label: '招聘教育及补偿', value: '招聘教育及补偿' },
  { label: '劳务外包', value: '劳务外包' }
]

export const aiReportDetail = {
  title: '人力成本分析报告',
  fileName: '人力成本分析报告.txt',
  summary: '基于当前筛选条件生成的人力成本报告摘要，覆盖费率、成本、收入、人数及组织偏差。',
  sections: [
    {
      title: '核心结论',
      paragraphs: [
        '本周期综合费率整体可控，但当月费率较目标偏离 0.57pp，江苏末端为最大偏差来源。',
        'YTD 综合费率同比改善，成本总额仍连续上行，需按组织分层跟进。'
      ]
    },
    {
      title: '风险与机会',
      paragraphs: [
        '高风险点集中在费率波动较大、预算偏离度偏高的组织单元。',
        '改善项具备可复制性，可向同类组织推广标准动作。'
      ]
    },
    {
      title: '行动建议',
      paragraphs: [
        '1. 对异常 Top 组织开展专项复盘，明确责任人与完成时间。',
        '2. 将费率、成本、人效纳入周会跟踪，形成周闭环。',
        '3. 对可快速纠偏的科目优先压降变动成本。'
      ]
    }
  ]
}

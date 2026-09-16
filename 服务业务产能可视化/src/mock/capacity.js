import { store, isAcMode, isFutureOrToday, orderVolumeLabel, timeSlotLabel, demoSeed } from '@/store'

export const navMenuData = [
  {
    key: 'capacity',
    label: '服务产能',
    children: [{ key: 'capacity-board', label: '产能可视化' }]
  }
]

export const timeSlotOptions = [
  { label: '全天 00:00-23:59', value: 'all' },
  { label: '上午 00:00-13:00', value: 'am' },
  { label: '下午 13:00-23:59', value: 'pm' }
]

export const workerTypeOptions = [
  { label: '全部', value: 'all' },
  { label: '新工人', value: 'new' },
  { label: '老工人', value: 'old' }
]

export const qualRoleOptions = [
  { label: '全部', value: 'all' },
  { label: '主资质', value: 'main' },
  { label: '辅资质', value: 'aux' }
]

export const productLines = [
  { label: '家电', value: 'appliance' },
  { label: '家居', value: 'home' },
  { label: '安装', value: 'install' }
]

export const qualifications = [
  {
    value: 'appliance',
    label: '家电维修',
    children: [
      { value: 'tv', label: '电视机维修' },
      { value: 'washer', label: '洗衣机维修' },
      { value: 'fridge', label: '冰箱维修' }
    ]
  },
  {
    value: 'ac-install',
    label: '家用空调安装',
    children: [
      { value: 'ac', label: '空调安装' }
    ]
  },
  {
    value: 'home',
    label: '家居安装',
    children: [
      { value: 'toilet', label: '马桶安装' },
      { value: 'cabinet', label: '橱柜安装' }
    ]
  }
]

const SITE_AUTH = {
  admin: {
    北京: ['通州服务网点', '朝阳服务网点'],
    上海: ['浦东服务网点'],
    江苏: ['南京服务网点'],
    浙江: ['杭州服务网点'],
    广东: ['广州服务网点']
  },
  site: {
    北京: ['通州服务网点']
  }
}

const ADDRESS_TREE = {
  北京: {
    通州区: ['张家湾', '小红门', '马驹桥', '台湖镇'],
    朝阳区: ['高碑店', '将台']
  },
  上海: {
    浦东新区: ['张江', '陆家嘴']
  },
  江苏: {
    南京市: ['鼓楼', '建邺']
  },
  浙江: {
    杭州市: ['西湖', '滨江']
  },
  广东: {
    广州市: ['天河', '海珠']
  }
}

export function visibleProvinces() {
  return Object.keys(SITE_AUTH[store.viewMode] || SITE_AUTH.admin)
}

export function visibleSites() {
  const map = SITE_AUTH[store.viewMode] || SITE_AUTH.admin
  if (!store.province) {
    return Object.keys(map).reduce((list, province) => list.concat(map[province]), [])
  }
  return map[store.province] || []
}

export function visibleAddr1() {
  if (store.province) return Object.keys(ADDRESS_TREE[store.province] || {})
  return Object.keys(ADDRESS_TREE).reduce(
    (list, province) => list.concat(Object.keys(ADDRESS_TREE[province])),
    []
  )
}

export function visibleAddr2() {
  if (store.province && store.addr1) {
    return ADDRESS_TREE[store.province][store.addr1] || []
  }
  if (store.addr1) {
    const found = Object.keys(ADDRESS_TREE).find((province) => ADDRESS_TREE[province][store.addr1])
    return found ? ADDRESS_TREE[found][store.addr1] : []
  }
  return []
}

export function visibleQual1() {
  return qualifications
}

export function visibleQual2() {
  const current = qualifications.find((item) => item.value === store.qual1)
  return current ? current.children : []
}

function slotFactor() {
  if (store.timeSlot === 'am' || store.timeSlot === 'pm') return 0.5
  return 1
}

function scopeFactor() {
  let factor = 1
  if (store.province) factor *= 0.28
  if (store.site) factor *= 0.55
  if (store.addr1) factor *= 0.72
  if (store.addr2) factor *= 0.55
  if (store.productLine) factor *= 0.62
  if (store.qual1) factor *= 0.48
  if (store.qual2) factor *= 0.7
  if (store.workerType === 'new') factor *= 0.22
  if (store.workerType === 'old') factor *= 0.78
  if (store.qualRole === 'main') factor *= 0.68
  if (store.qualRole === 'aux') factor *= 0.32
  if (isAcMode()) factor *= 0.74
  if (store.viewMode === 'site') factor *= 0.42
  return factor
}

function round(value, digits = 0) {
  const base = Math.pow(10, digits)
  return Math.round(value * base) / base
}

function formatNumber(value, digits = 0) {
  return round(value, digits).toLocaleString('zh-CN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  })
}

function formatPercent(value) {
  return `${round(value, 1)}%`
}

function computeOverview() {
  const seed = demoSeed(1)
  const factor = slotFactor() * scopeFactor()
  const accept = Math.max(48, round((1860 + seed) * factor))
  const used = Math.max(12, round(accept * (0.42 + (seed % 17) / 100)))
  const remain = Math.max(0, round(accept - used, 1))
  const saturation = round((used / accept) * 100, 1)
  const workers = Math.max(6, round((320 + (seed % 40)) * factor * 0.35))
  const activeRatio = 0.62 + (seed % 9) / 100
  const activeWorkers = Math.max(4, round(workers * activeRatio))
  const activeAccept = Math.max(24, round(accept * activeRatio))
  const activeUsed = Math.max(8, round(used * activeRatio * 1.04))
  const activeRemain = Math.max(0, round(activeAccept - activeUsed, 1))
  const activeSaturation = round((activeUsed / activeAccept) * 100, 1)
  const efficiency = round(used / Math.max(workers, 1), 2)
  const activeEfficiency = round(activeUsed / Math.max(activeWorkers, 1), 2)
  const orders = Math.max(10, round(used * (0.86 + (seed % 11) / 100)))
  const riskSites = saturation >= 85 ? 6 : saturation >= 70 ? 3 : 1
  const idleSites = saturation <= 45 ? 5 : saturation <= 60 ? 3 : 2
  return {
    accept,
    used,
    remain,
    saturation,
    workers,
    efficiency,
    orders,
    activeWorkers,
    activeAccept,
    activeUsed,
    activeRemain,
    activeSaturation,
    activeEfficiency,
    activeRatio,
    riskSites,
    idleSites
  }
}

export function overviewMetrics() {
  const data = computeOverview()
  const volumeTitle = orderVolumeLabel()
  return [
    {
      title: '总产能',
      value: formatNumber(data.accept),
      unit: '单',
      help: true,
      helpText: '看板总产能取可接单产能，已扣减其他资质占用，不是标准产能。',
      trends: [{ name: '活跃产能', value: formatNumber(data.activeAccept), type: 'flat' }]
    },
    {
      title: '已用产能',
      value: formatNumber(data.used),
      unit: '单',
      help: true,
      helpText: '已用产能按服务单实际四级地址占用，不按工程师服务范围均分。',
      trends: [{ name: '活跃已用', value: formatNumber(data.activeUsed), type: 'flat' }]
    },
    {
      title: '剩余产能',
      value: formatNumber(data.remain),
      unit: '单',
      help: true,
      helpText: '剩余产能 = 可接单产能 - 已用产能。',
      trends: [{ name: '活跃剩余', value: formatNumber(data.activeRemain), type: 'flat' }]
    },
    {
      title: '产能饱和度',
      value: formatPercent(data.saturation),
      tone: data.saturation >= 90 ? 'danger' : data.saturation <= 40 ? 'muted' : '',
      help: true,
      helpText: '饱和度 = 已用产能 / 可接单产能。过饱和与不饱和网点分别展示前 10。',
      trends: [{ name: '活跃饱和度', value: formatPercent(data.activeSaturation), type: 'flat' }]
    },
    {
      title: '人效',
      value: formatNumber(data.efficiency, 2),
      unit: '单/人',
      trends: [{ name: '活跃人效', value: formatNumber(data.activeEfficiency, 2), type: 'flat' }]
    },
    {
      title: volumeTitle,
      value: formatNumber(data.orders),
      unit: '单',
      help: true,
      helpText: isFutureOrToday()
        ? '查询今天及之后展示预测单量：去年同日完工单量 × 近 2 天同比系数。'
        : '查询今天之前展示完工单量，按服务单号去重。'
    }
  ]
}

export function overviewSideMetrics() {
  const data = computeOverview()
  return [
    {
      title: '工程师数',
      value: formatNumber(data.workers),
      unit: '人',
      trends: [{ name: '活跃工程师', value: formatNumber(data.activeWorkers), type: 'flat' }]
    },
    {
      title: '活跃占比',
      value: formatPercent(data.activeRatio * 100),
      help: true,
      helpText: '昨日或今日在汪师傅打卡通过，计为活跃工程师。'
    }
  ]
}

export function overviewSummary() {
  const data = computeOverview()
  const volumeTitle = orderVolumeLabel()
  const slot = timeSlotLabel()
  const scope = [
    store.province,
    store.site,
    qualifications.find((item) => item.value === store.qual1)?.label || store.qual1,
    visibleQual2().find((item) => item.value === store.qual2)?.label || '',
    slot
  ].filter(Boolean).join(' / ') || '全国'
  const ranks = saturationRanks()
  const acHint = isAcMode() ? '当前按空调主工程师口径展示。' : ''
  return `${scope} ${slot}总产能 ${formatNumber(data.accept)} 单，活跃产能 ${formatNumber(data.activeAccept)} 单，饱和度 ${formatPercent(data.saturation)}。过饱和网点 ${ranks.over.length} 个、不饱和网点 ${ranks.under.length} 个，${volumeTitle} ${formatNumber(data.orders)} 单。${acHint}`
}

export const trendTabOptions = [
  { label: '总产能', value: 'capacity' },
  { label: '已用产能', value: 'used' },
  { label: '剩余产能', value: 'remain' },
  { label: '产能饱和度', value: 'saturation' },
  { label: '人效', value: 'efficiency' },
  { label: '单量', value: 'orders' }
]

export function trendLegend() {
  const volumeTitle = orderVolumeLabel()
  const current = trendTabOptions.find((item) => item.value === store.trendTab)
  return [
    { label: current ? current.label : '总产能', color: 'var(--blue-06)' },
    { label: '活跃产能', color: 'var(--chart-cyan-06)' },
    { label: volumeTitle, color: 'var(--chart-navy)' }
  ]
}

function namedRows(names, extra = 0) {
  const data = computeOverview()
  return names.map((name, index) => {
    const ratio = 1 - index * 0.08 - (demoSeed(extra + index) % 7) / 100
    const accept = Math.max(8, round(data.accept * ratio / names.length * 1.6))
    const used = Math.max(2, round(accept * (0.28 + (index % 6) * 0.14)))
    const remain = Math.max(0, round(accept - used, 1))
    const saturation = round((used / accept) * 100, 1)
    const workers = Math.max(2, round(data.workers * ratio / names.length * 1.4))
    const activeRatio = 0.58 + (index % 6) / 50
    const activeAccept = Math.max(4, round(accept * activeRatio))
    const activeUsed = Math.max(1, round(used * activeRatio * 1.05))
    const activeRemain = Math.max(0, round(activeAccept - activeUsed, 1))
    const activeSaturation = round((activeUsed / activeAccept) * 100, 1)
    const orders = Math.max(1, round(used * 0.9))
    return {
      name,
      accept: formatNumber(accept),
      used: formatNumber(used),
      remain: formatNumber(remain),
      saturation: formatPercent(saturation),
      efficiency: formatNumber(used / workers, 2),
      activeAccept: formatNumber(activeAccept),
      activeUsed: formatNumber(activeUsed),
      activeRemain: formatNumber(activeRemain),
      activeSaturation: formatPercent(activeSaturation),
      orders: formatNumber(orders),
      saturationValue: saturation,
      acceptValue: accept,
      remainValue: remain
    }
  })
}

export function metricTabOptions() {
  const options = [
    { label: '省区', value: 'province' },
    { label: '网点', value: 'site' },
    { label: '区域', value: 'area' },
    { label: '工程师', value: 'engineer' }
  ]
  if (isAcMode()) options.push({ label: '工程师组', value: 'group' })
  return options
}

export function metricNameTitle() {
  const map = {
    province: '省区',
    site: '网点',
    area: '区域',
    engineer: '工程师',
    group: '工程师组'
  }
  return map[store.metricTab] || '名称'
}

export function metricColumns() {
  const volumeTitle = orderVolumeLabel()
  return [
    { key: 'accept', title: '总产能' },
    { key: 'used', title: '已用产能' },
    { key: 'remain', title: '剩余产能' },
    { key: 'saturation', title: '饱和度' },
    { key: 'efficiency', title: '人效' },
    { key: 'orders', title: volumeTitle }
  ]
}

const ENGINEERS = [
  { name: '张三', site: '通州服务网点', role: '主资质', qual: '电视机维修', type: '老工人', active: true, acLead: false },
  { name: '李四', site: '通州服务网点', role: '主资质', qual: '空调安装', type: '老工人', active: true, acLead: true },
  { name: '王五', site: '朝阳服务网点', role: '辅资质', qual: '洗衣机维修', type: '老工人', active: false, acLead: false },
  { name: '赵六', site: '浦东服务网点', role: '主资质', qual: '冰箱维修', type: '新工人', active: true, acLead: false },
  { name: '周七', site: '南京服务网点', role: '主资质', qual: '马桶安装', type: '老工人', active: true, acLead: false },
  { name: '吴八', site: '杭州服务网点', role: '辅资质', qual: '电视机维修', type: '老工人', active: false, acLead: false },
  { name: '郑九', site: '广州服务网点', role: '主资质', qual: '空调安装', type: '老工人', active: true, acLead: true },
  { name: '钱十', site: '通州服务网点', role: '主资质', qual: '洗衣机维修', type: '新工人', active: true, acLead: false }
]

export function metricRows() {
  if (store.metricTab === 'province') {
    return namedRows(visibleProvinces(), 11).map((row) => ({ ...row, key: row.name, actionText: '查看网点' }))
  }
  if (store.metricTab === 'site') {
    return namedRows(visibleSites(), 21).map((row) => ({ ...row, key: row.name, actionText: '查看区域' }))
  }
  if (store.metricTab === 'area') {
    const areas = store.addr1
      ? visibleAddr2().map((item) => `${store.addr1}-${item}`)
      : ['通州区-张家湾', '通州区-小红门', '朝阳区-高碑店', '浦东新区-张江', '南京市-鼓楼', '杭州市-西湖']
    return namedRows(areas, 31).map((row) => ({ ...row, key: row.name, actionText: '查看工程师' }))
  }
  if (store.metricTab === 'group') {
    return namedRows(['通州空调一组', '朝阳空调二组', '广州空调三组', '浦东空调四组'], 41).map((row, index) => ({
      ...row,
      key: row.name,
      lead: ['李四', '孙工', '郑九', '陈工'][index],
      actionText: '查看组员'
    }))
  }
  return ENGINEERS.filter((item) => {
    if (store.site && item.site !== store.site) return false
    if (store.workerType === 'new' && item.type !== '新工人') return false
    if (store.workerType === 'old' && item.type !== '老工人') return false
    if (store.qualRole === 'main' && item.role !== '主资质') return false
    if (store.qualRole === 'aux' && item.role !== '辅资质') return false
    if (isAcMode() && !item.acLead && store.qual1 === 'ac-install') return false
    return true
  }).map((item, index, list) => {
    const row = namedRows(list.map((rowItem) => rowItem.name), 51)[index]
    return {
      ...row,
      key: item.name,
      site: item.site,
      role: item.role,
      qual: item.qual,
      type: item.type,
      active: item.active ? '是' : '否',
      acLead: item.acLead ? '是' : '否',
      actionText: '查看明细'
    }
  })
}

export function engineerExtraColumns() {
  if (store.metricTab === 'engineer') {
    return [
      { key: 'qual', title: '二级资质' },
      { key: 'role', title: '主辅资质' }
    ]
  }
  if (store.metricTab === 'group') {
    return [{ key: 'lead', title: '主工程师' }]
  }
  return []
}

export function scopedMetricRows(scope = 'all') {
  return metricRows().map((row) => {
    if (scope !== 'active') return row
    return {
      ...row,
      accept: row.activeAccept,
      used: row.activeUsed,
      remain: row.activeRemain,
      saturation: row.activeSaturation
    }
  })
}

const RISK_SITES = [
  '通州服务网点',
  '朝阳服务网点',
  '浦东服务网点',
  '南京服务网点',
  '杭州服务网点',
  '广州服务网点',
  '苏州服务网点',
  '成都服务网点',
  '武汉服务网点',
  '西安服务网点',
  '青岛服务网点',
  '厦门服务网点'
]

export function saturationRanks() {
  const names = store.viewMode === 'site' ? visibleSites() : RISK_SITES
  const rows = namedRows(names, 81)
  const over = rows
    .filter((row) => row.saturationValue >= 75)
    .slice(0, 10)
    .map((row, index) => ({ ...row, rank: index + 1, value: row.saturation }))
  const under = rows
    .filter((row) => row.saturationValue < 55)
    .slice(0, 10)
    .map((row, index) => ({ ...row, rank: index + 1, value: row.saturation }))
  return { over, under }
}

export const saturationColumns = [
  { key: 'name', title: '网点' },
  { key: 'value', title: '饱和度' },
  { key: 'remain', title: '剩余产能' }
]

export function engineerDetail(row) {
  const target = row || store.selectedEngineer || ENGINEERS[0]
  const name = target.name || '张三'
  const slots = store.timeSlot === 'all' ? ['上午', '下午'] : [timeSlotLabel()]
  const areas = store.addr2 ? [store.addr2] : ['张家湾', '小红门']
  const quals = store.qual2
    ? [visibleQual2().find((item) => item.value === store.qual2)?.label || '当前资质']
    : ['电视机维修', '洗衣机维修']
  const labels = []
  quals.forEach((qual) => {
    slots.forEach((slot) => {
      areas.forEach((area) => {
        labels.push(`${qual} / ${area} / ${slot}`)
      })
    })
  })
  const rows = namedRows(labels, 90).map((item, index) => ({
    name: labels[index],
    accept: item.accept,
    used: item.used,
    remain: item.remain,
    saturation: item.saturation,
    duration: labels[index].indexOf('洗衣') >= 0 ? '50min' : '20min',
    transit: '10min'
  }))
  return {
    title: `${name} 产能明细`,
    description: `${target.site || '通州服务网点'} · ${target.qual || '电视机维修'} · ${target.role || '主资质'} · 活跃 ${target.active || '是'} · 在途时长 10min`,
    rows
  }
}

export const engineerDetailColumns = [
  { key: 'accept', title: '总产能' },
  { key: 'used', title: '已用产能' },
  { key: 'remain', title: '剩余产能' },
  { key: 'saturation', title: '饱和度' },
  { key: 'duration', title: '平均每单时长' }
]

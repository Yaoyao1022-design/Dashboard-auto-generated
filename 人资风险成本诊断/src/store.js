import Vue from 'vue'

export const store = Vue.observable({
  theme: 'labor',
  scene: 'onjob',
  drillTab: 'org',
  orgLevel: 'hq',
  line: '',
  province: '',
  c1Dept: '',
  timeRange: '2026-08-01',
  queryNonce: 0,
  metricDetailOpen: false,
  laborCostOpen: false,
  aiReportOpen: false,
  personExceptionOpen: false,
  personListOpen: false,
  orgFullOpen: false,
  selectedPerson: null,
  laborCostScope: 'ytd'
})

function closeDrawers() {
  store.metricDetailOpen = false
  store.laborCostOpen = false
  store.aiReportOpen = false
  store.personExceptionOpen = false
  store.personListOpen = false
  store.orgFullOpen = false
}

export const actions = {
  resetFilter() {
    store.orgLevel = 'hq'
    store.line = ''
    store.province = ''
    store.c1Dept = ''
    store.timeRange = '2026-08-01'
    store.queryNonce = 0
  },
  setOrgLevel(level) {
    if (store.orgLevel === level) return
    store.orgLevel = level
    store.line = ''
    store.province = ''
    store.c1Dept = ''
  },
  query() {
    store.queryNonce += 1
  },
  setTheme(theme) {
    store.theme = theme
    closeDrawers()
  },
  setScene(scene) {
    store.scene = scene
  },
  setDrillTab(tab) {
    store.drillTab = tab
  },
  openMetricDetail() {
    closeDrawers()
    store.metricDetailOpen = true
  },
  openLaborCost() {
    closeDrawers()
    store.laborCostOpen = true
  },
  openAiReport() {
    closeDrawers()
    store.aiReportOpen = true
  },
  openPersonException(person) {
    closeDrawers()
    store.selectedPerson = person || null
    store.personExceptionOpen = true
  },
  openPersonList() {
    closeDrawers()
    store.personListOpen = true
  },
  openOrgFull() {
    closeDrawers()
    store.orgFullOpen = true
  },
  closeDrawers
}

export function periodLabels(timeRange) {
  const date = timeRange ? new Date(timeRange) : new Date('2026-08-01')
  const year = String(date.getFullYear()).slice(2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return {
    ytd: `${year}年${month}月YTD`,
    month: `${year}年${month}月`
  }
}

export function chartLabels(period) {
  if (period === 'year') return ['21年', '22年', '23年', '24年', '25年', '26年']
  return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
}

export function demoSeed(extra = 0) {
  const key = [
    store.orgLevel,
    store.line,
    store.province,
    store.c1Dept,
    store.timeRange,
    store.theme,
    store.scene,
    String(store.queryNonce),
    String(extra)
  ].join('|')
  let hash = 0
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) % 1000
  }
  return hash
}

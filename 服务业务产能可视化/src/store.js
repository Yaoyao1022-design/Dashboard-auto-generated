import Vue from 'vue'

export const TODAY = '2026-09-16'

export const store = Vue.observable({
  viewMode: 'admin',
  queryDate: TODAY,
  timeSlot: 'all',
  province: '',
  site: '',
  addr1: '',
  addr2: '',
  addr3: '',
  productLine: '',
  qual1: '',
  qual2: '',
  workerType: 'all',
  qualRole: 'all',
  queryNonce: 0,
  trendTab: 'capacity',
  metricTab: 'province',
  engineerOpen: false,
  selectedEngineer: null
})

export const actions = {
  resetFilter() {
    store.viewMode = 'admin'
    store.queryDate = TODAY
    store.timeSlot = 'all'
    store.province = ''
    store.site = ''
    store.addr1 = ''
    store.addr2 = ''
    store.addr3 = ''
    store.productLine = ''
    store.qual1 = ''
    store.qual2 = ''
    store.workerType = 'all'
    store.qualRole = 'all'
    store.queryNonce = 0
    store.trendTab = 'capacity'
    store.metricTab = 'province'
  },
  query() {
    store.queryNonce += 1
    if (store.metricTab === 'group' && !isAcMode()) {
      store.metricTab = 'province'
    }
  },
  setViewMode(mode) {
    store.viewMode = mode
    store.province = ''
    store.site = ''
    store.addr1 = ''
    store.addr2 = ''
    store.addr3 = ''
  },
  setProvince(value) {
    store.province = value
    store.site = ''
    store.addr1 = ''
    store.addr2 = ''
    store.addr3 = ''
  },
  setSite(value) {
    store.site = value
  },
  setAddr1(value) {
    store.addr1 = value
    store.addr2 = ''
    store.addr3 = ''
  },
  setAddr2(value) {
    store.addr2 = value
    store.addr3 = ''
  },
  setQual1(value) {
    store.qual1 = value
    store.qual2 = ''
    if (store.metricTab === 'group' && !isAcMode()) {
      store.metricTab = 'province'
    }
  },
  setProductLine(value) {
    store.productLine = value
    if (store.metricTab === 'group' && !isAcMode()) {
      store.metricTab = 'province'
    }
  },
  openEngineer(row) {
    store.selectedEngineer = row || null
    store.engineerOpen = true
  },
  closeDrawers() {
    store.engineerOpen = false
  }
}

export function isFutureOrToday(date = store.queryDate) {
  return String(date || TODAY) >= TODAY
}

export function isAcMode() {
  return store.qual1 === 'ac-install' || store.productLine === 'install'
}

export function orderVolumeLabel(date = store.queryDate) {
  return isFutureOrToday(date) ? '预测单量' : '完工单量'
}

export function timeSlotLabel(slot = store.timeSlot) {
  if (slot === 'am') return '上午'
  if (slot === 'pm') return '下午'
  return '全天'
}

export function demoSeed(extra = 0) {
  const key = [
    store.viewMode,
    store.queryDate,
    store.timeSlot,
    store.province,
    store.site,
    store.addr1,
    store.addr2,
    store.addr3,
    store.productLine,
    store.qual1,
    store.qual2,
    store.workerType,
    store.qualRole,
    String(store.queryNonce),
    String(extra)
  ].join('|')
  let hash = 0
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) % 1000
  }
  return hash
}

export function trendLabels() {
  const date = new Date(`${store.queryDate}T00:00:00`)
  const labels = []
  for (let i = 14; i >= 0; i -= 1) {
    const item = new Date(date)
    item.setDate(date.getDate() - i)
    labels.push(`${item.getMonth() + 1}.${item.getDate()}`)
  }
  return labels
}

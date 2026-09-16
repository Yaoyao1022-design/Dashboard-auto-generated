<template>
  <section class="metric-tabs">
    <div class="toolbar">
      <div class="toolbar-left">
        <board-title text="产能指标" :level="1" />
        <capsule-tabs :options="scopeOptions" :value="workerScope" @input="workerScope = $event" />
      </div>
      <div class="toolbar-right">
        <capsule-tabs :options="tabOptions" :value="store.metricTab" @input="store.metricTab = $event" />
        <board-action kind="download" text="导出明细" @click="exportRows" />
      </div>
    </div>
    <board-table
      flat
      density="compact"
      :name-title="nameTitle"
      :columns="columns"
      :rows="rows"
      show-action
      :sticky-action="false"
      :action-text="actionText"
      @action="onAction"
    />
  </section>
</template>

<script>
import { store, actions } from '@/store'
import { downloadCsv } from '@/utils/download'
import {
  metricTabOptions,
  metricNameTitle,
  metricColumns,
  scopedMetricRows,
  engineerExtraColumns
} from '@/mock/capacity'

export default {
  name: 'MetricTabsPanel',
  data() {
    return {
      store,
      actions,
      workerScope: 'all',
      scopeOptions: [
        { label: '全量工程师', value: 'all' },
        { label: '活跃工程师', value: 'active' }
      ]
    }
  },
  computed: {
    tabOptions() {
      void this.store.qual1
      void this.store.productLine
      return metricTabOptions()
    },
    nameTitle() {
      void this.store.metricTab
      return metricNameTitle()
    },
    columns() {
      void this.store.queryDate
      void this.store.metricTab
      const metrics =
        this.store.metricTab === 'engineer'
          ? metricColumns().filter((col) => col.key !== 'efficiency')
          : metricColumns()
      return [...engineerExtraColumns(), ...metrics]
    },
    rows() {
      void this.store.queryNonce
      void this.store.metricTab
      return scopedMetricRows(this.workerScope)
    },
    actionText() {
      return this.store.metricTab === 'engineer' ? '查看明细' : '下探'
    }
  },
  methods: {
    onAction(row) {
      if (this.store.metricTab === 'engineer' || this.store.metricTab === 'group') {
        this.actions.openEngineer(row)
        return
      }
      if (this.store.metricTab === 'province') {
        this.actions.setProvince(row.name)
        this.store.metricTab = 'site'
        this.actions.query()
        return
      }
      if (this.store.metricTab === 'site') {
        this.actions.setSite(row.name)
        this.store.metricTab = 'area'
        this.actions.query()
        return
      }
      this.store.metricTab = 'engineer'
    },
    exportRows() {
      const headers = ['name'].concat(this.columns.map((col) => col.key))
      downloadCsv(`产能指标-${this.nameTitle}.csv`, headers, this.rows)
    }
  }
}
</script>

<style scoped>
.metric-tabs {
  background: var(--white);
  border-radius: var(--radius);
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 32px;
}
.toolbar-left,
.toolbar-right {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}
</style>

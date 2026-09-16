<template>
  <section class="overview">
    <div class="toolbar">
      <board-title text="产能概览" :level="1" />
      <div class="toolbar-right">
        <status-label :text="slotText" tone="info" />
        <status-label v-if="acMode" text="空调主工程师口径" tone="warning" />
        <status-label :text="volumeText" tone="normal" />
      </div>
    </div>
    <ai-summary :text="summaryText" />
    <div class="split">
      <div class="metric-side">
        <metric-group
          class="matrix"
          layout="grid"
          :columns="3"
          variant="l3-t"
          :show-divider="true"
          :items="metricItems"
        />
      </div>
      <div class="side">
        <metric-group layout="vertical" variant="l2-t" :items="sideItems" />
        <chart-progress-board
          :current="saturationCurrent"
          :goal="100"
          :tone="saturationTone"
          top-label="产能饱和度"
          :value-text="saturationText"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { store, isAcMode, orderVolumeLabel, timeSlotLabel } from '@/store'
import { overviewMetrics, overviewSideMetrics, overviewSummary } from '@/mock/capacity'

export default {
  name: 'OverviewPanel',
  data() {
    return { store }
  },
  computed: {
    metricItems() {
      void this.store.queryNonce
      return overviewMetrics()
    },
    sideItems() {
      void this.store.queryNonce
      return overviewSideMetrics()
    },
    summaryText() {
      void this.store.queryNonce
      return overviewSummary()
    },
    acMode() {
      void this.store.qual1
      void this.store.productLine
      return isAcMode()
    },
    slotText() {
      return `时段：${timeSlotLabel()}`
    },
    volumeText() {
      return orderVolumeLabel()
    },
    saturationCurrent() {
      const item = this.metricItems.find((row) => row.title === '产能饱和度')
      return item ? parseFloat(item.value) : 0
    },
    saturationText() {
      return this.metricItems.find((row) => row.title === '产能饱和度')?.value || '0%'
    },
    saturationTone() {
      if (this.saturationCurrent >= 90) return 'red'
      if (this.saturationCurrent <= 40) return 'orange'
      return 'green'
    }
  }
}
</script>

<style scoped>
.overview {
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
  min-height: 32px;
  gap: 12px;
}
.toolbar-right {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.split {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 16px;
  min-width: 0;
}
.metric-side,
.side {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.matrix {
  background: var(--board-metric-board-bg);
  border-radius: var(--radius);
  padding: 12px;
}
@media (max-width: 1100px) {
  .split {
    grid-template-columns: 1fr;
  }
}
</style>

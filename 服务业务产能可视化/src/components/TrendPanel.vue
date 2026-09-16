<template>
  <section class="trend">
    <div class="toolbar">
      <board-title text="近15天趋势" :level="1" />
      <capsule-tabs :options="trendTabOptions" :value="store.trendTab" @input="store.trendTab = $event" />
    </div>
    <ai-summary :text="hintText" />
    <chart-board
      variant="multi-line"
      plot-size="lg"
      fill
      :seed="chartSeed"
      :labels="chartLabels"
      :legend-items="legendItems"
    />
  </section>
</template>

<script>
import { store, demoSeed, trendLabels, orderVolumeLabel } from '@/store'
import { trendTabOptions, trendLegend } from '@/mock/capacity'

export default {
  name: 'TrendPanel',
  data() {
    return {
      store,
      trendTabOptions
    }
  },
  computed: {
    chartSeed() {
      return demoSeed(this.store.trendTab === 'capacity' ? 2 : 5)
    },
    chartLabels() {
      void this.store.queryDate
      return trendLabels()
    },
    legendItems() {
      void this.store.trendTab
      void this.store.queryDate
      return trendLegend()
    },
    hintText() {
      const volumeTitle = orderVolumeLabel()
      return `双折线对比全量与活跃工程师，第三条为${volumeTitle}。总产能 TAB 优先展示，查询今天及之后看预测单量，今天之前看完工单量。`
    }
  }
}
</script>

<style scoped>
.trend {
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
</style>

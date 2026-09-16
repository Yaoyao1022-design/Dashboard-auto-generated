<template>
  <div class="board">
    <query-bar />
    <overview-panel />
    <trend-panel />
    <metric-tabs-panel />
    <saturation-alert />
  </div>
</template>

<script>
import QueryBar from '@/components/QueryBar.vue'
import OverviewPanel from '@/components/OverviewPanel.vue'
import TrendPanel from '@/components/TrendPanel.vue'
import MetricTabsPanel from '@/components/MetricTabsPanel.vue'
import SaturationAlert from '@/components/SaturationAlert.vue'

export default {
  name: 'CapacityBoard',
  components: {
    QueryBar,
    OverviewPanel,
    TrendPanel,
    MetricTabsPanel,
    SaturationAlert
  }
}
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
}
</style>

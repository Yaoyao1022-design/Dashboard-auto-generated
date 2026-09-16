<template>
  <section class="labor-overview">
    <div class="toolbar">
      <board-title text="人力成本经营概览" :level="1" />
      <board-action kind="more" text="查看成本改善任务" @click="goTaskCenter" />
    </div>
    <div class="split">
      <div class="matrix-side">
        <div class="ctrl-row">
          <capsule-tabs :options="scopeOptions" :value="matrixScope" @input="matrixScope = $event" />
          <div class="ctrl-links">
            <board-action kind="more" text="查看综合人工成本" @click="actions.openLaborCost" />
            <board-action kind="more" text="查看指标详情" @click="actions.openMetricDetail" />
          </div>
        </div>
        <metric-group
          class="matrix"
          layout="grid"
          :columns="4"
          variant="l3-t"
          :show-divider="true"
          :items="matrixItems"
        />
      </div>
      <div class="chart-side">
        <div class="ctrl-row">
          <capsule-tabs :options="periodOptions" :value="chartPeriod" @input="chartPeriod = $event" />
          <board-radio-group :options="chartOptions" :value="chartMetric" @input="chartMetric = $event" />
        </div>
        <chart-board
          variant="multi-line"
          plot-size="lg"
          fill
          :seed="chartSeed"
          :labels="chartAxisLabels"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { store, actions, periodLabels, chartLabels, demoSeed } from '@/store'
import { laborMatrix } from '@/mock/labor'

export default {
  name: 'LaborOverview',
  data() {
    return {
      store,
      actions,
      matrixScope: 'ytd',
      chartPeriod: 'month',
      chartMetric: 'rate',
      scopeOptions: [
        { label: 'YTD指标', value: 'ytd' },
        { label: '月指标', value: 'month' }
      ],
      periodOptions: [
        { label: '年', value: 'year' },
        { label: '月', value: 'month' }
      ],
      chartOptions: [
        { label: '综合人工成本费率', value: 'rate' },
        { label: '综合人工成本', value: 'cost' },
        { label: '收入', value: 'income' }
      ]
    }
  },
  computed: {
    matrixItems() {
      const labels = periodLabels(this.store.timeRange)
      void this.store.queryNonce
      return laborMatrix.map((item, index) => {
        const next = { ...item }
        if (index === 0) next.title = this.matrixScope === 'month' ? labels.month : labels.ytd
        return next
      })
    },
    chartSeed() {
      return demoSeed(this.chartPeriod === 'year' ? 2 : 5) + (this.chartMetric === 'cost' ? 3 : 0)
    },
    chartAxisLabels() {
      return chartLabels(this.chartPeriod)
    }
  },
  methods: {
    goTaskCenter() {
      this.$message.info('任务中心不在本期成本分析页范围，请从导航进入任务列表。')
    }
  }
}
</script>

<style scoped>
.labor-overview {
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
}
.split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  min-width: 0;
}
.matrix-side,
.chart-side {
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.ctrl-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 32px;
  margin-bottom: 8px;
}
.ctrl-links {
  display: inline-flex;
  align-items: center;
  gap: 16px;
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

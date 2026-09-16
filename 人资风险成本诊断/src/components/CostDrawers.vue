<template>
  <div>
    <data-detail-drawer
      :visible="store.metricDetailOpen"
      title="全量指标明细"
      width="800px"
      @close="actions.closeDrawers"
    >
      <board-table
        expandable
        name-title="指标名称"
        :columns="metricColumns"
        :rows="laborMetricDetailRows"
      />
    </data-detail-drawer>

    <data-detail-drawer
      class="labor-cost-drawer"
      :visible="store.laborCostOpen"
      title="综合人工成本"
      width="1280px"
      @close="actions.closeDrawers"
    >
      <div class="drawer-toolbar">
        <capsule-tabs :options="costScopeOptions" :value="costScope" @input="costScope = $event" />
      </div>
      <board-table
        expandable
        name-title="科目"
        :columns="laborCostColumns"
        :column-groups="laborCostColumnGroups"
        :rows="laborCostBreakdownRows"
      />
      <div class="drawer-chart">
        <div class="drawer-toolbar">
          <board-title text="科目趋势" :level="1" />
          <el-select v-model="subject" size="small" placeholder="选择科目">
            <el-option
              v-for="item in laborCostSubjectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <chart-board
          variant="multi-line"
          plot-size="md"
          fill
          :seed="subjectSeed"
          :labels="monthLabels"
          :legend-items="[
            { label: '26年', color: 'var(--blue-06)' },
            { label: '25年', color: 'var(--chart-cyan-06)' }
          ]"
        />
      </div>
    </data-detail-drawer>

    <data-detail-drawer
      :visible="store.aiReportOpen"
      :title="aiReport.title"
      width="720px"
      show-footer
      confirm-text="下载报告"
      @close="actions.closeDrawers"
      @confirm="downloadAiReport"
    >
      <ai-summary :text="aiReport.summary" />
      <div v-for="section in aiReport.sections" :key="section.title" class="report-section">
        <board-title :text="section.title" :level="1" bar />
        <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
      </div>
    </data-detail-drawer>
  </div>
</template>

<script>
import { store, actions, periodLabels, chartLabels, demoSeed } from '@/store'
import { downloadTextFile } from '@/utils/download'
import {
  laborMetricDetailColumns,
  laborMetricDetailRows,
  laborCostColumns,
  laborCostColumnGroups,
  laborCostBreakdownRows,
  laborCostSubjectOptions,
  aiReportDetail
} from '@/mock/labor'
import { leakAiReport } from '@/mock/leak'

export default {
  name: 'CostDrawers',
  data() {
    return {
      store,
      actions,
      costScope: 'ytd',
      subject: '综合人工成本',
      laborMetricDetailRows,
      laborCostColumns,
      laborCostColumnGroups,
      laborCostBreakdownRows,
      laborCostSubjectOptions,
      costScopeOptions: [
        { label: 'YTD指标', value: 'ytd' },
        { label: '当月指标', value: 'month' },
        { label: 'MTD预测', value: 'mtd' }
      ]
    }
  },
  computed: {
    metricColumns() {
      const labels = periodLabels(this.store.timeRange)
      return laborMetricDetailColumns.map((col) => {
        if (col.key === 'ytd') return { ...col, title: labels.ytd }
        if (col.key === 'month') return { ...col, title: `${labels.month}当月` }
        return col
      })
    },
    monthLabels() {
      return chartLabels('month')
    },
    subjectSeed() {
      return demoSeed(this.subject.length + (this.costScope === 'month' ? 4 : 1))
    },
    aiReport() {
      return this.store.theme === 'leak' ? leakAiReport : aiReportDetail
    }
  },
  methods: {
    downloadAiReport() {
      const detail = this.aiReport
      const lines = [detail.title, '', detail.summary, '']
      detail.sections.forEach((section) => {
        lines.push(section.title)
        section.paragraphs.forEach((paragraph) => lines.push(paragraph))
        lines.push('')
      })
      downloadTextFile(detail.fileName, lines)
    }
  }
}
</script>

<style scoped>
.labor-cost-drawer {
  --board-drawer-max-width: 1280px;
}
.drawer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.drawer-chart {
  margin-top: 16px;
}
.report-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
.report-section p {
  color: var(--grey-02);
  font-size: 14px;
  line-height: 22px;
}
</style>

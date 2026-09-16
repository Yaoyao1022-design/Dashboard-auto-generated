<template>
  <div class="cockpit">
    <query-bar />
    <switch-card-panel
      plain
      :items="themeItems"
      :selected-index="selectedIndex"
      :auto-menu-download="false"
      @select="onSelectTheme"
      @action-view="onAiReportView"
      @action-download="onAiReportDownload"
    >
      <div v-if="store.theme === 'labor'" class="theme-body">
        <labor-overview />
        <labor-org-detail />
      </div>
      <leakage-panel v-else />
    </switch-card-panel>
  </div>
</template>

<script>
import { store, actions, periodLabels } from '@/store'
import { laborThemeCard, aiReportDetail } from '@/mock/labor'
import { leakThemeCard, leakAiReport } from '@/mock/leak'
import { downloadTextFile } from '@/utils/download'
import QueryBar from '@/components/QueryBar.vue'
import LaborOverview from '@/components/LaborOverview.vue'
import LaborOrgDetail from '@/components/LaborOrgDetail.vue'
import LeakagePanel from '@/components/LeakagePanel.vue'

function toThemeItem(card, labels) {
  const metrics = card.metrics || []
  return {
    key: card.key,
    title: card.title,
    selectedTitle: card.title,
    unselectedTitle: card.title,
    headerActionText: card.headerActionText,
    summary: card.summary,
    metrics: [
      { ...metrics[0], title: labels.ytd },
      { ...metrics[1], title: labels.month }
    ]
  }
}

export default {
  name: 'CostAnalysis',
  components: { QueryBar, LaborOverview, LaborOrgDetail, LeakagePanel },
  data() {
    return { store, actions }
  },
  computed: {
    selectedIndex() {
      return this.store.theme === 'leak' ? 1 : 0
    },
    themeItems() {
      const labels = periodLabels(this.store.timeRange)
      return [toThemeItem(laborThemeCard, labels), toThemeItem(leakThemeCard, labels)]
    }
  },
  methods: {
    onSelectTheme(index) {
      this.actions.setTheme(index === 1 ? 'leak' : 'labor')
    },
    resolveReport(index) {
      return index === 1 ? leakAiReport : aiReportDetail
    },
    onAiReportView(item, index) {
      this.actions.setTheme(index === 1 ? 'leak' : 'labor')
      this.actions.openAiReport()
    },
    onAiReportDownload(item, index) {
      this.downloadReport(this.resolveReport(index))
    },
    downloadReport(detail) {
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
.cockpit {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
}
.theme-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

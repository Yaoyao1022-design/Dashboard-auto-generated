<template>
  <div>
    <data-detail-drawer
      :visible="store.personExceptionOpen"
      title="异常明细"
      width="1000px"
      @close="actions.closeDrawers"
    >
      <board-table
        name-title="员工姓名"
        :columns="personExceptionColumns"
        :rows="personExceptionRows"
      />
    </data-detail-drawer>

    <data-detail-drawer
      :visible="store.personListOpen"
      title="全部人员明细"
      width="1000px"
      @close="actions.closeDrawers"
    >
      <board-table
        name-title="排序"
        :columns="personListColumns"
        :rows="personListRows"
      />
    </data-detail-drawer>

    <data-detail-drawer
      :visible="store.orgFullOpen"
      title="组织全量明细"
      width="1000px"
      show-footer
      confirm-text="导出全量明细"
      :breadcrumb-items="orgBreadcrumb"
      :breadcrumb-index="orgLevelIndex"
      @breadcrumb-select="onOrgBreadcrumb"
      @close="actions.closeDrawers"
      @confirm="exportOrgCsv"
    >
      <div v-if="orgLevelIndex === 0" class="org-summary">
        <metric-group layout="horizontal" variant="l2-t" :items="orgSummaryItems" />
      </div>
      <board-table
        :name-title="currentOrgLevel.nameTitle"
        :columns="currentOrgLevel.columns"
        :rows="currentOrgLevel.rows"
        :show-action="currentOrgLevel.key !== 'person'"
        action-text="下探"
        @action="drillOrg"
      />
    </data-detail-drawer>
  </div>
</template>

<script>
import { store, actions } from '@/store'
import { downloadCsv } from '@/utils/download'
import {
  personExceptionColumns,
  personListColumns,
  leakPersonFullRows,
  buildPersonExceptionRows,
  orgFullDetail
} from '@/mock/leak'

export default {
  name: 'LeakDrawers',
  data() {
    return {
      store,
      actions,
      personExceptionColumns,
      personListColumns,
      orgFullDetail,
      orgLevelIndex: 0
    }
  },
  computed: {
    personExceptionRows() {
      return buildPersonExceptionRows(this.store.selectedPerson)
    },
    personListRows() {
      return leakPersonFullRows.map((row) => ({
        ...row,
        staffName: row.name,
        name: String(row.index)
      }))
    },
    currentOrgLevel() {
      return orgFullDetail.levels[this.orgLevelIndex] || orgFullDetail.levels[0]
    },
    orgBreadcrumb() {
      return orgFullDetail.levels.slice(0, this.orgLevelIndex + 1).map((item) => item.label)
    },
    orgSummaryItems() {
      return [
        { title: '异常明细数', value: orgFullDetail.exceptionCount, unit: orgFullDetail.exceptionUnit },
        { title: '预计挽损金额', value: orgFullDetail.recoverAmount, unit: orgFullDetail.recoverUnit, tone: 'danger' }
      ]
    }
  },
  watch: {
    'store.orgFullOpen'(open) {
      if (open) this.orgLevelIndex = 0
    }
  },
  methods: {
    drillOrg() {
      if (this.orgLevelIndex < orgFullDetail.levels.length - 1) {
        this.orgLevelIndex += 1
      }
    },
    onOrgBreadcrumb(index) {
      this.orgLevelIndex = index
    },
    exportOrgCsv() {
      const level = this.currentOrgLevel
      const headers = ['name'].concat(level.columns.map((col) => col.key))
      downloadCsv(`${level.label}全量明细.csv`, headers, level.rows)
    }
  }
}
</script>

<style scoped>
.org-summary {
  margin-bottom: 12px;
}
</style>

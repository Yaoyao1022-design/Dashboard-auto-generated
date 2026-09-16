<template>
  <data-detail-drawer
    :visible="store.engineerOpen"
    :title="detail.title"
    :description="detail.description"
    width="1080px"
    show-footer
    confirm-text="导出明细"
    @close="actions.closeDrawers"
    @confirm="exportDetail"
  >
    <board-table
      flat
      name-title="资质 / 地址 / 时段"
      :columns="engineerDetailColumns"
      :rows="detail.rows"
    />
  </data-detail-drawer>
</template>

<script>
import { store, actions } from '@/store'
import { downloadCsv } from '@/utils/download'
import { engineerDetail, engineerDetailColumns } from '@/mock/capacity'

export default {
  name: 'EngineerDrawer',
  data() {
    return {
      store,
      actions,
      engineerDetailColumns
    }
  },
  computed: {
    detail() {
      void this.store.selectedEngineer
      void this.store.queryNonce
      return engineerDetail(this.store.selectedEngineer)
    }
  },
  methods: {
    exportDetail() {
      downloadCsv(
        `${this.detail.title}.csv`,
        ['name'].concat(this.engineerDetailColumns.map((col) => col.key)),
        this.detail.rows
      )
    }
  }
}
</script>

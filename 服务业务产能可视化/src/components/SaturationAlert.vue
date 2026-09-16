<template>
  <section v-if="showPanel" class="saturation">
    <div class="toolbar">
      <board-title text="产能饱和度预警" :level="1" />
      <status-label :text="hint" :tone="hintTone" />
    </div>
    <div class="split">
      <div v-if="overRows.length" class="col">
        <board-title text="过饱和网点 TOP10" :level="1" bar />
        <rank-list
          :columns="saturationColumns"
          :rows="overRows"
          sort-key="rank"
          sort-order="asc"
        />
      </div>
      <div v-if="underRows.length" class="col">
        <board-title text="不饱和网点 TOP10" :level="1" bar />
        <rank-list
          :columns="saturationColumns"
          :rows="underRows"
          sort-key="rank"
          sort-order="asc"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { store } from '@/store'
import { saturationRanks, saturationColumns } from '@/mock/capacity'

export default {
  name: 'SaturationAlert',
  data() {
    return {
      store,
      saturationColumns
    }
  },
  computed: {
    ranks() {
      void this.store.queryNonce
      return saturationRanks()
    },
    overRows() {
      return this.ranks.over
    },
    underRows() {
      return this.ranks.under
    },
    showPanel() {
      return this.overRows.length > 0 || this.underRows.length > 0
    },
    hint() {
      return `过饱和 ${this.overRows.length} 个 / 不饱和 ${this.underRows.length} 个`
    },
    hintTone() {
      if (this.overRows.length >= 5) return 'error'
      if (this.underRows.length >= 5) return 'warning'
      return 'info'
    }
  }
}
</script>

<style scoped>
.saturation {
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
.col {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
@media (max-width: 1100px) {
  .split {
    grid-template-columns: 1fr;
  }
}
</style>

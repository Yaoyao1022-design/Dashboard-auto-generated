<template>
  <section class="labor-org">
    <template v-if="isMapPerspective">
      <div class="block-head">
        <board-title :text="detailTitle" :level="1" />
        <capsule-tabs :options="mapSliceOptions" :value="slice" @input="slice = $event" />
      </div>
      <div v-if="slice === 'province'" class="map-split">
        <chart-map plot-size="lg" fit="slice" />
        <div class="map-side">
          <ai-summary :text="summaryText" />
          <div class="ctrl-row">
            <capsule-tabs :options="mapScopeOptions" :value="mapScope" @input="mapScope = $event" />
            <board-radio-group :options="mapMetricOptions" :value="mapMetric" @input="mapMetric = $event" />
          </div>
          <rank-list
            :columns="cityRankColumns"
            :rows="laborCityRankRows"
            sort-key="rank"
            sort-order="asc"
          />
        </div>
      </div>
      <div v-else class="dept-split">
        <div class="dept-col">
          <board-title text="费率情况" :level="1" bar />
          <rank-list
            :columns="deptRankColumns"
            :rows="laborDeptRateRows"
            sort-key="rate"
            sort-order="desc"
          />
        </div>
        <div class="dept-col">
          <board-title text="效率情况" :level="1" bar />
          <rank-list
            :columns="efficiencyRankColumns"
            :rows="laborDeptEfficiencyRows"
            sort-key="rate"
            sort-order="desc"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="block-head">
        <board-title :text="tableTitle" :level="1" />
      </div>
      <ai-summary :text="summaryText" />
      <board-table
        expandable
        :name-title="nameTitle"
        :columns="laborRateColumns"
        :rows="laborLineTableRows"
      />
    </template>

    <template v-if="store.orgLevel === 'c1'">
      <div class="block-head budget-head">
        <div class="head-left">
          <board-title text="预算管控" :level="1" />
          <capsule-tabs :options="budgetPeriodOptions" :value="budgetPeriod" @input="budgetPeriod = $event" />
        </div>
        <capsule-tabs :options="budgetTypeOptions" :value="budgetType" @input="budgetType = $event" />
      </div>
      <div class="budget-cards">
        <board-card
          v-for="card in budgetCards"
          :key="card.title"
          variant="emphasis"
          fluid
          :title="card.title"
        >
          <div class="budget-groups">
            <div v-for="group in card.groups" :key="group.title" class="budget-group">
              <board-title :text="group.title" :level="1" bar />
              <metric-group
                layout="vertical"
                variant="l3-t"
                :items="group.items"
                :show-divider="false"
              />
            </div>
          </div>
        </board-card>
      </div>
    </template>
  </section>
</template>

<script>
import { store, periodLabels } from '@/store'
import {
  laborCityRankRows,
  laborDeptRateRows,
  laborDeptEfficiencyRows,
  laborRateColumns,
  laborLineTableRows,
  laborDetailSummaries,
  laborBudgetCards
} from '@/mock/labor'

export default {
  name: 'LaborOrgDetail',
  data() {
    return {
      store,
      laborCityRankRows,
      laborDeptRateRows,
      laborDeptEfficiencyRows,
      laborRateColumns,
      laborLineTableRows,
      slice: 'province',
      mapScope: 'ytd',
      mapMetric: 'l1l2',
      budgetPeriod: 'year',
      budgetType: 'cost',
      mapMetricOptions: [
        { label: 'L1-L2省区', value: 'l1l2' },
        { label: 'L3-L4省区', value: 'l3l4' },
        { label: 'L5省区', value: 'l5' }
      ],
      budgetPeriodOptions: [
        { label: '年', value: 'year' },
        { label: '月', value: 'month' }
      ],
      budgetTypeOptions: [
        { label: '成本预实对比', value: 'cost' },
        { label: 'HC预实对比', value: 'hc' }
      ]
    }
  },
  computed: {
    isMapPerspective() {
      return this.store.orgLevel === 'hq' || this.store.orgLevel === 'line'
    },
    detailTitle() {
      return this.store.orgLevel === 'line' ? '部门及条线详情（条线视角）' : '部门及条线详情（总部视角）'
    },
    tableTitle() {
      return this.store.orgLevel === 'c1' ? '部门及条线详情（C1视角）' : '部门及条线详情（省区视角）'
    },
    nameTitle() {
      return this.store.orgLevel === 'c1' ? '二级部门' : '条线'
    },
    deptSliceLabel() {
      return this.store.orgLevel === 'hq' ? '一级部门' : '二级部门'
    },
    mapSliceOptions() {
      return [
        { label: '省区', value: 'province' },
        { label: this.deptSliceLabel, value: 'dept' }
      ]
    },
    mapScopeOptions() {
      const labels = periodLabels(this.store.timeRange)
      return [
        { label: labels.ytd + '指标', value: 'ytd' },
        { label: labels.month + '指标', value: 'month' }
      ]
    },
    summaryText() {
      const key = this.store.orgLevel
      return laborDetailSummaries[key] || laborDetailSummaries.hq
    },
    cityRankColumns() {
      return [
        { key: 'rank', title: '排序' },
        { key: 'rate', title: this.store.orgLevel === 'line' ? '当月费率' : '综合费率' },
        { key: 'yoy', title: this.store.orgLevel === 'line' ? '当月同比' : '同比', trend: true }
      ]
    },
    deptRankColumns() {
      return [
        { key: 'name', title: this.deptSliceLabel },
        { key: 'rate', title: '综合费率' },
        { key: 'yoy', title: '同比', trend: true }
      ]
    },
    efficiencyRankColumns() {
      return [
        { key: 'name', title: this.deptSliceLabel },
        { key: 'rate', title: '效率值' },
        { key: 'yoy', title: '同比', trend: true }
      ]
    },
    budgetCards() {
      const labels = periodLabels(this.store.timeRange)
      return laborBudgetCards.map((card) => {
        const groups = card.groups
          .filter((group) => card.title !== '编制预算' || group.key === 'month')
          .map((group) => {
            const title = group.key === 'ytd'
              ? labels.ytd
              : group.key === 'mtd'
                ? `${labels.month}MTD`
                : labels.month
            const items = group.items.map((item) => {
              if (this.budgetType !== 'hc') return { ...item }
              return {
                ...item,
                unit: item.unit === '百万' ? '人' : item.unit,
                title: item.title.replace('成本预算', '编制预算').replace('实际已用', '当日在职')
              }
            })
            return { ...group, title, items }
          })
        return {
          ...card,
          title: this.budgetType === 'hc' && card.title === '成本监控' ? '编制监控' : card.title,
          groups
        }
      })
    }
  },
  watch: {
    'store.orgLevel'() {
      this.slice = 'province'
    }
  }
}
</script>

<style scoped>
.labor-org {
  background: var(--white);
  border-radius: var(--radius);
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.block-head,
.ctrl-row,
.budget-head,
.head-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 32px;
}
.head-left {
  justify-content: flex-start;
  flex: 1;
}
.map-split,
.dept-split,
.budget-cards {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  min-width: 0;
}
.map-side,
.dept-col,
.budget-group {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.budget-groups {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
@media (max-width: 1100px) {
  .map-split,
  .dept-split,
  .budget-cards,
  .budget-groups {
    grid-template-columns: 1fr;
  }
}
</style>

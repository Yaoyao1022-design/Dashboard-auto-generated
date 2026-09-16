<template>
  <div class="leak-panel">
    <div class="toolbar">
      <board-title text="跑冒滴漏巡检概览" :level="1" />
      <board-action kind="more" text="查看跑冒滴漏任务" @click="goTaskCenter" />
    </div>

    <div class="inspect">
      <div class="inspect-main">
        <board-title text="本月巡检识别风险及处置情况" :level="1" />
        <metric-group
          layout="horizontal"
          nowrap
          variant="l2-t"
          :items="leakInspectKpis"
        />
        <div class="handle-split">
          <board-card title="自动拦截" variant="soft" fluid>
            <metric-group layout="horizontal" variant="l3-t" :items="leakInspectAuto" />
          </board-card>
          <board-card title="人工处理" variant="soft" fluid>
            <metric-group layout="horizontal" variant="l3-t" :items="leakInspectManual" />
          </board-card>
        </div>
      </div>
      <div class="inspect-chart">
        <chart-board
          variant="bar-multi"
          plot-size="lg"
          fill
          :seed="chartSeed"
          :labels="chartAxisLabels"
        />
      </div>
    </div>

    <div class="toolbar">
      <capsule-tabs :options="drillOptions" :value="store.drillTab" @input="actions.setDrillTab" />
    </div>

    <template v-if="store.drillTab === 'org'">
      <rank-card-list
        variant="multi"
        :items="visibleOrgItems"
        :expanded-index="orgExpandedIndex"
        @toggle="onOrgToggle"
        @export="actions.openOrgFull"
      />
      <div v-if="leakOrgRankItems.length > 5" class="more-row">
        <board-action
          kind="expand"
          :expanded="orgShowAll"
          :text="orgShowAll ? '收起组织' : '查看更多组织'"
          @click="orgShowAll = !orgShowAll"
        />
      </div>
    </template>

    <template v-else-if="store.drillTab === 'scene'">
      <div class="scene-cards">
        <switch-card
          v-for="card in leakSceneCards"
          :key="card.id"
          size="small"
          :title="card.title"
          :value="card.count"
          unit="条"
          :impact="card.impact"
          :selected="store.scene === card.id"
          @select="actions.setScene(card.id)"
        />
      </div>
      <div class="toolbar">
        <board-title :text="sceneTitle + '排行'" :level="1" />
        <board-action kind="download" text="导出场景明细" @click="exportSceneCsv" />
      </div>
      <rank-card-list
        variant="single"
        :items="sceneRankItems"
        :expanded-index="sceneExpandedIndex"
        @toggle="onSceneToggle"
        @export="exportSceneCsv"
        @detail-export="exportSceneCsv"
      />
    </template>

    <template v-else>
      <div class="toolbar">
        <board-title text="高风险人员" :level="1" />
        <board-action kind="more" text="查看全部人员明细（100条）" @click="actions.openPersonList" />
      </div>
      <rank-grid-list
        :items="visiblePersonItems"
        :columns="1"
        clickable
        @select="onSelectPerson"
      />
    </template>
  </div>
</template>

<script>
import { store, actions, chartLabels, demoSeed } from '@/store'
import { downloadCsv } from '@/utils/download'
import {
  leakInspectKpis,
  leakInspectAuto,
  leakInspectManual,
  leakSceneCards,
  leakOrgRankItems,
  leakSceneRankItems,
  leakSceneSourceRows,
  leakPersonItems
} from '@/mock/leak'

export default {
  name: 'LeakagePanel',
  data() {
    return {
      store,
      actions,
      leakInspectKpis,
      leakInspectAuto,
      leakInspectManual,
      leakSceneCards,
      leakOrgRankItems,
      leakPersonItems,
      orgShowAll: false,
      orgExpandedIndex: -1,
      sceneExpandedIndex: -1,
      drillOptions: [
        { label: '组织下探', value: 'org' },
        { label: '场景下探', value: 'scene' },
        { label: '高风险人员', value: 'person' }
      ]
    }
  },
  computed: {
    chartSeed() {
      return demoSeed(11)
    },
    chartAxisLabels() {
      return chartLabels('month')
    },
    visibleOrgItems() {
      return this.orgShowAll ? leakOrgRankItems : leakOrgRankItems.slice(0, 5)
    },
    sceneTitle() {
      const card = leakSceneCards.find((item) => item.id === this.store.scene)
      return card ? card.title : '场景'
    },
    sceneRankItems() {
      return leakSceneRankItems[this.store.scene] || leakSceneRankItems.onjob
    },
    visiblePersonItems() {
      return leakPersonItems.slice(0, 10)
    }
  },
  methods: {
    goTaskCenter() {
      this.$message.info('任务中心不在本期范围，请从导航进入任务列表。')
    },
    onOrgToggle(index) {
      this.orgExpandedIndex = this.orgExpandedIndex === index ? -1 : index
    },
    onSceneToggle(index) {
      this.sceneExpandedIndex = this.sceneExpandedIndex === index ? -1 : index
    },
    onSelectPerson(item) {
      this.actions.openPersonException(item)
    },
    exportSceneCsv() {
      const rows = leakSceneSourceRows.map((row) => ({
        异常编号: row.no,
        组织: row.org,
        岗位: row.post,
        涉及人数: row.people,
        预计影响: row.impact,
        状态: row.status
      }))
      downloadCsv(`${this.sceneTitle}明细.csv`, ['异常编号', '组织', '岗位', '涉及人数', '预计影响', '状态'], rows)
    }
  }
}
</script>

<style scoped>
.leak-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.toolbar,
.more-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
}
.more-row {
  justify-content: center;
}
.inspect {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  min-width: 0;
}
.inspect-main,
.inspect-chart {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.handle-split,
.scene-cards {
  display: grid;
  gap: 12px;
  min-width: 0;
}
.handle-split {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
.scene-cards {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
@media (max-width: 1100px) {
  .inspect,
  .handle-split,
  .scene-cards {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div class="home-page board-container is-fluid">
    <home-notice-board
      class="home-notice"
      title="系统上新公告"
      more-text="查看全部"
      fluid
      :items="noticeItems"
      tag-variant="solid"
      @more-click="onNoticeMore"
      @item-click="onNoticeItem"
    />

    <div class="home-body">
      <div class="home-domains">
        <board-card
          v-for="card in domainCards"
          :key="card.key"
          class="home-domain-card"
          variant="plain"
          fluid
        >
          <div class="domain-head">
            <board-title
              variant="card"
              :text="card.title"
              :icon="resolveDomainIcon(card)"
              :show-action="false"
            />
            <board-text-link
              text="进入"
              :icon="arrowRightIcon"
              @click="enterDomain(card)"
            />
          </div>
          <p class="domain-sub">{{ card.subtitle }}</p>

          <div class="domain-metrics">
            <board-card
              v-for="(metric, index) in card.metrics"
              :key="card.key + '-metric-' + index"
              class="domain-metric-card"
              variant="soft"
              fluid
            >
              <metric-block
                variant="l2"
                show-icon
                :icon-name="metric.iconName"
                :title="metric.title"
                :value="metric.value"
                :unit="metric.unit || ''"
              />
            </board-card>
          </div>

          <ul class="domain-tasks" role="list">
            <li
              v-for="(task, index) in card.tasks"
              :key="card.key + '-task-' + index"
              class="domain-task"
            >
              <span class="domain-task__title" :title="task.title">{{ task.title }}</span>
              <status-label
                :text="task.status"
                :tone="task.tone"
                variant="solid"
              />
            </li>
          </ul>
        </board-card>
      </div>

      <aside class="home-aside">
        <board-card class="home-aside-card" variant="plain" fluid>
          <board-title text="快捷应用" :bar="false" :show-action="false" />
          <home-quick-menu
            class="home-quick"
            variant="advanced"
            :items="quickApps"
            @item-click="onQuickApp"
          />
        </board-card>

        <board-card class="home-aside-card" variant="plain" fluid>
          <board-title text="帮助手册" :bar="false" :show-action="false" />
          <div class="help-grid">
            <button
              v-for="guide in helpGuides"
              :key="guide.key"
              type="button"
              class="help-item"
              @click="onHelpClick(guide)"
            >
              <span class="help-item__index">{{ guide.index }}</span>
              <span class="help-item__body">
                <span class="help-item__title">{{ guide.title }}</span>
                <span class="help-item__desc">{{ guide.desc }}</span>
              </span>
              <span
                class="help-item__arrow"
                :style="arrowMaskStyle"
                aria-hidden="true"
              />
            </button>
          </div>
        </board-card>
      </aside>
    </div>
  </div>
</template>

<script>
import {
  homeNoticeItems,
  homeDomainCards,
  homeQuickApps,
  homeHelpGuides
} from '@/mock/home'
import { resolveIcon3d } from 'jdl-board-kit/src/icons/icon3dLibrary.js'
import arrowRightIcon from 'jdl-board-kit/src/assets/icons/board/icon-arrow-right-min.svg'

export default {
  name: 'HomePage',
  data() {
    return {
      noticeItems: homeNoticeItems,
      domainCards: homeDomainCards,
      quickApps: homeQuickApps,
      helpGuides: homeHelpGuides,
      arrowRightIcon
    }
  },
  computed: {
    arrowMaskStyle() {
      const mask = `url("${this.arrowRightIcon}")`
      return {
        WebkitMaskImage: mask,
        maskImage: mask
      }
    }
  },
  methods: {
    resolveDomainIcon(card) {
      return resolveIcon3d(card.iconName, '文档')
    },
    enterDomain() {
      // 预览页仅展示首页，不跳转其他业务页
    },
    onNoticeMore() {},
    onNoticeItem() {},
    onQuickApp() {},
    onHelpClick() {}
  }
}
</script>

<style scoped>
.home-page {
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
}

/* 公告标签置前，对齐原型 */
.home-notice >>> .home-notice-board__tag {
  order: -1;
}

.home-body {
  display: flex;
  align-items: stretch;
  gap: 12px;
  min-width: 0;
}

.home-domains {
  flex: 1;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.home-domain-card {
  min-width: 0;
  background: var(--white);
}

.home-domain-card.board-card.is-plain {
  background: var(--white);
}

.domain-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.domain-head >>> .board-title {
  min-width: 0;
  flex: 1;
}

.domain-sub {
  margin: 4px 0 0;
  color: var(--grey-03);
  font-size: 12px;
  line-height: 18px;
}

.domain-metrics {
  display: flex;
  align-items: stretch;
  gap: 8px;
  margin-top: 12px;
  min-width: 0;
}

.domain-metric-card {
  flex: 1 1 0;
  min-width: 0;
}

.domain-metric-card >>> .board-card__body {
  padding: 12px;
}

.domain-tasks {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.domain-task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 28px;
  padding: 6px 0;
  border-radius: 0;
  background: transparent;
  box-sizing: border-box;
}

.domain-task__title {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--grey-01);
  font-size: 14px;
  line-height: 20px;
}

.home-aside {
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.home-aside-card {
  min-width: 0;
  background: var(--white);
}

.home-aside-card.board-card.is-plain {
  background: var(--white);
}

.home-aside-card >>> .board-title {
  margin-bottom: 12px;
}

.home-quick {
  margin-top: 4px;
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.help-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  position: relative;
  min-height: 88px;
  padding: 10px 12px;
  border: 0;
  border-radius: 8px;
  background: var(--grey-07);
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
}

.help-item:hover {
  background: var(--blue-06-a10);
}

.help-item__index {
  color: var(--blue-06);
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}

.help-item__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding-right: 16px;
}

.help-item__title {
  color: var(--grey-01);
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
}

.help-item__desc {
  color: var(--grey-03);
  font-size: 12px;
  line-height: 16px;
}

.help-item__arrow {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 14px;
  height: 14px;
  background-color: var(--blue-06);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}

@media (max-width: 1200px) {
  .home-body {
    flex-direction: column;
  }

  .home-aside {
    width: 100%;
  }
}

@media (max-width: 900px) {
  .home-domains {
    grid-template-columns: 1fr;
  }
}
</style>

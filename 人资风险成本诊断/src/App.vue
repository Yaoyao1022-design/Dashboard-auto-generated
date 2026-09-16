<template>
  <div class="page-host">
    <el-page-layout
      layout-mode="complex"
      :menu-data="navMenuData"
      active-menu-key="labor-cost"
      :content-padded="false"
      user-name="驾驶舱"
      user-theme-value="white"
    >
      <div class="page-main board-container is-fluid">
        <cost-analysis />
      </div>
    </el-page-layout>
    <cost-drawers />
    <leak-drawers />
  </div>
</template>

<script>
import { navMenuData } from '@/mock/labor'
import CostAnalysis from '@/views/CostAnalysis.vue'
import CostDrawers from '@/components/CostDrawers.vue'
import LeakDrawers from '@/components/LeakDrawers.vue'

export default {
  name: 'App',
  components: { CostAnalysis, CostDrawers, LeakDrawers },
  data() {
    return { navMenuData }
  }
}
</script>

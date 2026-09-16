<template>
  <div class="page-host">
    <el-page-layout
      layout-mode="complex"
      :menu-data="navMenuData"
      active-menu-key="capacity-board"
      :content-padded="false"
      user-name="产能看板"
      user-theme-value="white"
    >
      <div class="page-main board-container is-fluid">
        <capacity-board />
      </div>
    </el-page-layout>
    <engineer-drawer />
  </div>
</template>

<script>
import { navMenuData } from '@/mock/capacity'
import CapacityBoard from '@/views/CapacityBoard.vue'
import EngineerDrawer from '@/components/EngineerDrawer.vue'

export default {
  name: 'App',
  components: { CapacityBoard, EngineerDrawer },
  data() {
    return { navMenuData }
  }
}
</script>

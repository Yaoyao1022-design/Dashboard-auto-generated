<template>
  <div class="page-host">
    <el-page-layout
      layout-mode="complex"
      :menu-data="navMenuData"
      active-menu-key="home"
      :content-padded="false"
      :user-name="userName"
      :user-avatar="userAvatar"
      :logo="logo"
      user-theme-value="white"
    >
      <div class="page-main board-container is-fluid">
        <home-page />
      </div>
    </el-page-layout>
  </div>
</template>

<script>
import HomePage from '@/views/Home.vue'
import logo from '@/assets/logo.png'
import userAvatar from '@/assets/icon-user.svg'

export default {
  name: 'App',
  components: { HomePage },
  data() {
    return {
      logo,
      userAvatar,
      userName: '郝铭梓',
      /** 预览仅挂首页，不暴露其他业务页 */
      navMenuData: [{ key: 'home', label: '首页' }]
    }
  }
}
</script>

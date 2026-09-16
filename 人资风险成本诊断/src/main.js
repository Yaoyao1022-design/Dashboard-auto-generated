import Vue from 'vue'
import LuiUI from '@lui/lui-ui'
import PageLayout from '@lui/lui-pro/lib/page-layout.js'
import BoardKit from 'jdl-board-kit'
import 'jdl-board-kit/src/styles/tokens.css'
import 'jdl-board-kit/src/styles/layout.css'
import '../node_modules/jdl-board-kit/src/styles/chart-tokens.css'
import '@lui/lui-ui/lib/theme-chalk/index.css'
import '@lui/lui-pro/lib/theme-chalk/index.css'
import App from './App.vue'
import './styles/page.css'

const Layout = PageLayout && PageLayout.default ? PageLayout.default : PageLayout

Vue.use(LuiUI)
Vue.component(Layout.name || 'ElPageLayout', Layout)
Vue.use(BoardKit)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')

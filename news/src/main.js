import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 挂载全局变量
import global_ from './utils/Global'
Vue.prototype.GLOBAL = global_
Vue.config.productionTip = false

new Vue({
  router,
  data: function() {
    return {
      is_search: false,
      is_in_search_result: false,
      search_word: '',
      search_type: 'default',
      search_background_color: "#ee0a24",
      logo_url: "https://tangwei.cc/imgs/logo_word.png",
      last_path: "/",
      current_path: "/recommend",
      current_limit_days: 2
    }
  },
  render: h => h(App)
}).$mount('#app')

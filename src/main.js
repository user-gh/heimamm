import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 导入路由对象，默认先找js文件
import router from '@/router/index'
// 挂载到vue实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app') 

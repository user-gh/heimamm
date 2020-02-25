import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 导入 Element-ui
import ElementUI from 'element-ui';

// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';

// 注册 Element-ui
Vue.use(ElementUI);


// 导入路由对象，默认先找js文件
import router from '@/router/index'
// 挂载到vue实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app') 

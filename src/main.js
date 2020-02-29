import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 导入 Element-ui
import ElementUI from 'element-ui';

// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';

// 注册 Element-ui
Vue.use(ElementUI);

// 导入基础样式，import 路径就可以了
// import '@/style/main.css'
import './style/base.css';


// 导入路由对象，默认先找js文件
import router from '@/router/index'
// 导入vuex对象
import store from '@/store/index'
// 导入全局过滤器
import '@/filters/filters.js'
// 挂载到vue实例
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app') 

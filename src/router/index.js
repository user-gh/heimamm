// 导入vue
import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'

// 注册路由
Vue.use(VueRouter)

// 准备组件
import login from '@/views/login/index';
import index from '@/views/index/index';
import user from '@/views/index/user/index';
// 设置路由规则
const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/index',
    component: index,
    children: [
      // 子路由一搬不加 /
      {
        path: 'user',
        component: user
      }
    ]
  },]

// 创建路由对象
const router = new VueRouter({
  routes
})

// 暴露出去
export default router
// 导入vue
import Vue from 'vue'

// 导NProgress的包
import NProgress from 'nprogress';
// 导NProgress的样式
import 'nprogress/nprogress.css'

//导入路由
import VueRouter from 'vue-router'

// 注册路由
Vue.use(VueRouter)

// 准备组件
import login from '@/views/login/index';
import index from '@/views/index/index';
import user from '@/views/index/user/index';
import chart from '@/views/index/chart/index';
import buisiness from '@/views/index/buisiness/index';
import question from '@/views/index/question/index';
import subject from '@/views/index/subject/index';
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
      },
      {
        path: 'chart',
        component: chart
      },
      {
        path: 'buisiness',
        component: buisiness
      },
      {
        path: 'question',
        component: question
      },
      {
        path: 'subject',
        component: subject
      },
    ]
  },]

// 创建路由对象
const router = new VueRouter({
  routes
})

// 导航守卫写在router对象的后面
// 即将跳转路由之前调用
// to: 到哪去
// from: 从哪来
// next：函数,调用函数就跳转(代表放行)
router.beforeEach((to,from,next) => {
  // 开启进度条
  NProgress.start();
  next();
})
 
// 跳转之后调用 
router.afterEach(() => {
  // 结束进度条
  NProgress.done();
})
// 暴露出去 
export default router
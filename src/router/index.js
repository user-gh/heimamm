// 导入vue
import Vue from 'vue'

// 导NProgress的包
import NProgress from 'nprogress';
// 导NProgress的样式
import 'nprogress/nprogress.css';
// 导入登录页axios请求用户信息接口方法
import { info } from '@/api/index.js';
// 导入 删除token方法的文件
import { removeToken } from '@/utilis/token.js';
// 单独引入message
import { Message } from 'element-ui';

//导入路由
import VueRouter from 'vue-router'
// 导入store
import store from '@/store/index'
// 注册路由
Vue.use(VueRouter)

import login from '@/views/login/index';
import index from '@/views/index/index';

// 导入子路由规则
import children from './childrenRoutes.js'
// 设置路由规则
const routes = [
  {
    path: '/',
    // 路由重定向
    redirect: '/login'
  },
  {
    path: '/login',
    component: login,
    meta: {
      title: '登录',
      routes: [
        '超级管理员',
        '管理员',
        '老师',
        '学生'
      ]
    }
  },
  {
    path: '/index',
    component: index,
    meta: {
      title: '首页',
      routes: [
        '超级管理员',
        '管理员',
        '老师',
        '学生'
      ]
    },
    children
  },]

// 创建路由对象
const router = new VueRouter({
  routes
})

// 定义一个白名单数组
let whiteUrl = ['/login']

// 导航守卫写在router对象的后面
// 即将跳转路由之前调用
// to: 到哪去
// from: 从哪来
// next：函数,调用函数就跳转(代表放行)
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  // 如果路由白名单包含某路径,直接放行 
  if (whiteUrl.includes(to.path)) {
    next();
  } else {
    // 判断token真假
    info().then(res => {
      // token 正确
      if (res.data.code == 200) {
        // 如果状态为1 方向，否则打回登录页
        // 账号启用状态
        if (res.data.data.status == 1) {  
          // 把返回的名字存到vuex的数据仓库中
          store.commit('changeUsername', res.data.data.username);
          // 把返回的头像存到vuex的数据仓库中
          store.commit('changeAvatar', process.env.VUE_APP_URL + '/' + res.data.data.avatar);
          //  将当前的角色存进vuex中，供首页访问
          store.commit('changeRole', res.data.data.role);
          // 如果是真的，直接 放行
          // 从登录调过来的,就提示登录成功
          if (from.path == '/login') {
            Message.success('登陆成功');
          }

          // 判断当前登录的角色是不是在要去的页面
          if (to.meta.routes.includes(res.data.data.role)) {
            next();
             // 没有权限访问
          } else {
            Message.warning('该页面无权访问');
            // 手动把进度条完成
            NProgress.done();  
            next(from.path);
          }
          // 账号禁用状态
        }else{
          // 代表禁用
          Message.warning('账户被禁用,请与管理员联系');
          NProgress.done();
          next('/login')
        }
         // token 错误
      } else {
        // 弹出提示(在路由里this不是vue实例,所以没有this.$message)
        // this.$message.error('登录状态异常,请 重新登录');
        Message.error('登录状态异常,请重新登录');
        // 删除本地token
        removeToken();
        // 手动把进度条完成
        NProgress.done();
        // 放行到登录页
        next('/login');
      }
    })
  }
})

// 跳转之后调用 
router.afterEach((to) => {
  // 结束进度条
  NProgress.done();
  // 取出当前要去的页面的标签设置给title
  document.title = to.meta.title;
})
// 暴露出去 
export default router
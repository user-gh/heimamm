<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <!-- 头部左边的部分  -->
      <div class="left">
        <!-- 字体图标 -->
        <i
          @click="isCollapse = !isCollapse"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></i>
        <img src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 头部右边的部分 -->
      <div class="right">
        <img :src="$store.state.avatar" alt />
        <span class="name">{{ $store.state.username }}, 你好</span>
        <el-button @click="doLogout" type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧导航菜单部分 -->
      <el-aside class="my-aside" width="auto">
        <el-menu router :collapse='isCollapse' default-active='1' class='el-menu-vertical-demo'>
          <!-- router 为 true 启用路由模式，false为不启用 
                以被点击的菜单的index属性作为路径跳转
        -->
          <template v-for="(item, index) in childrenRoutes">
            <el-menu-item :key="index" :index="'/index/'+ item.path" v-if="item.meta.routes.includes($store.state.role)" >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>  
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <!-- 子路由的路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import { logout } from "@/api/index.js";
import { removeToken, getToken } from "@/utilis/token.js";
// 导入子路由规则
import childrenRoutes from "@/router/childrenRoutes.js";
export default {
  name: "index",
  data() {
    return {
      username: "",
      avater: "",
      // 是否折叠菜单
      isCollapse: false,
      // 把路由的规则数组存到data
      childrenRoutes
    };
  },
  // 方法集合
  methods: {
    //  用户退出按钮的事件
    doLogout() {
      this.$confirm("您将退出本系统,是否继续?", "是否退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发请求(调用退出接口的方法)
          logout().then(() => {
            this.$message.success("退出成功");
            // 调用删除token的接口方法
            removeToken();
            // 清空vuex的数据
            this.$store.commit("changeUsername", "");
            this.$store.commit("changeAvatar", "");
            // 跳回登录页面
            this.$router.push("/login");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "感谢您留下来陪着我,我好开心"
          });
        });
    }
  },
  // 创建之前的钩子函数
  beforeCreate() {
    // 判断是否有token，没有代表没登录，跳转登录页
    if (getToken() == null) {
      // 给个提示
      this.$message.error("请先登录");
      // 跳回登录页面
      this.$router.push("/login");
    }
  }
};
</script>

<style lang='less'>
.my-container {
  height: 100%;

  .my-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .left {
    display: flex;
    align-items: center;
    height: 100%;

    i {
      font-size: 24px;
      margin-right: 22px;
    }

    img {
      width: 33px;
      height: 28px;
    }

    span {
      margin-left: 11px;
      width: 92px;
      height: 22px;
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(73, 161, 255, 1);
    }
  }

  .right {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 43px;
      height: 43px;
      margin-right: 9px;
    }

    span.name {
      font-size: 14px;
      margin-right: 38px;
    }
  }
  //   .my-aside {
  //     background-color: yellowgreen;
  //   }

  .my-main {
    background-color: #0094ff;
  }
}
// 导航菜单的动画效果
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
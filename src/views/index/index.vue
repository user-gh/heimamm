<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <!-- 左边的部分  -->
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 右边的部分 -->
      <div class="right">
       <img :src="avater" alt />
        <span class="name">{{username}}, 你好</span>
        <el-button type='primary' size='small'>退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my-aside" width="200px">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import { info } from '@/api/index.js';

export default {
  name: "index",
  data() {
    return {
        username:'',
        avater: ''
    };
  },
  // 创建之后的钩子函数 
  created() {
    // 调用 获取当前的用户信息的接口方法
      info().then(res => {
        //   console.log(res);
        this.username = res.data.data.username;
        // 记得在前面拼接基地址
        this.avater = process.env.VUE_APP_URL + '/' + res.data.data.avatar;
      })
  },
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

  .right{
      height: 100%;
      display: flex;
      align-items: center;

      img{
          width: 43px;
          height: 43px;
          margin-right: 9px;
      }

      span.name{
          font-size: 14px;
          margin-right: 38px;
      }

       
  }
  .my-aside {
    background-color: yellowgreen;
  }

  .my-main {
    background-color: #0094ff;
  }
}
</style>
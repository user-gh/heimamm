<template>
  <div>
    <!-- 路由的出口 -->
    <router-view></router-view>
    <router-link to='#'>点我</router-link>
    <el-button>我是按钮</el-button>
  </div>
</template>

<script>
export default {
  name:'App',
  data() {
    return {
      
    }
  },
}
</script>

<style>

</style>
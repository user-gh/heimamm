<template>
  <el-select v-model="subject" placeholder="请选择学科" @change="selChange">
    <el-option v-if="isSearch" value=''>所有学科</el-option>
    <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import { subjectList } from "@/api/subject";
export default {
  name: "subjectSelect",
  // 需要父传子
  // 要用 v-moedl,要有父传子,并且prop要叫value
  // 需要子传父,并且事件名叫input
  props: {
    value: {
      // 默认值
      default: ""
    },
    isSearch:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      // 在这里接收父组件传过来 的值
      subject: this.value,
      subjectList: []
    }; 
  },
  methods: {
    // 给改变事件
    // 把改变后的值传给父组件
    selChange(val) {
      // 在这里给父组件传值
      // val就是改变后的值
      this.$emit("input", val);
    }
  },
  created() {
    // 获取学科列表
    subjectList({
      state: 1
    }).then(res => {
      console.log(res);
      this.subjectList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>
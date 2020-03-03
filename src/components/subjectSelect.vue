<template>
  <el-select v-model="subject" placeholder="请选择学科" @change="selChange">
    <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" value="item.id"></el-option>
  </el-select>
</template>

<script>
import { subjectList } from "@/api/subject";
export default {
  name: "subjectSelect",
  props: {
    value: {
      default: ""
    }
  },
  data() {
    return {
      subject: this.value,
      subjectList: []
    };
  },
  methods: {
    selChange(val) {
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
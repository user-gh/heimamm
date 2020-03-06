<template>
  <el-select v-model="enterprise" placeholder="请选择企业"  @change="selChange">
    <el-option v-if="isSearch" value='所有企业'></el-option>
    <el-option
      v-for="(item, index) in buisinessList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { buisinessList } from "@/api/buisiness";
export default {
  name: "buisinessSelect",
  props: {
    value: {
      default: ""
    },
    isSearch:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      enterprise:this.value,
      buisinessList:[]
    };
  },
  // 监听器
  watch: {
    // 监听value，只要value值改变了,把它赋值给enterpirse
    value(val){
      this.enterprise = val;
    }
  },
  methods: {
    selChange(val) {
      this.$emit("input", val);
    }
  },
  created() {
    // 获取企业列表
    buisinessList({
      state: 1
    }).then(res => {
      this.buisinessList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>
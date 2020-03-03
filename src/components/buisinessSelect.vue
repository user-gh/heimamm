<template>
  <el-select v-model="enterprise" placeholder="请选择企业"  @change="selChange">
    <el-option
      v-for="(item, index) in buisinessList"
      :key="index"
      :label="item.name"
      value="item.id"
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
    }
  },
  data() {
    return {
      enterprise:this.value,
      buisinessList:[]
    };
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
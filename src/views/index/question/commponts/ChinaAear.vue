<template>
  <el-cascader
    v-model="city"
    :options="options"
    :props="{ expandTrigger: 'hover',value:'label' }"
    @change="Change"
  ></el-cascader>
</template>

<script>
// 导入中国省市区级联数据
import { provinceAndCityDataPlus } from "element-china-area-data";
export default {
    name:'ChinaAear',
    props:{
        value:{
            default: ""
        }
    },
    data() {
        return {
            city:this.value,
            options:provinceAndCityDataPlus
        }
    },
    methods: {
        Change(val){
            this.$emit('input',val);
        }
    },
};
</script>

<style>
</style>
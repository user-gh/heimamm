<template>
  <div>
    <el-card class="card-top">
      <ul>
        <li>
          <span class="circle">{{topData.increment_users}}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span class="circle">{{topData.total_users}}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="circle orange">{{topData.increment_questions}}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="circle orange">{{topData.total_questions}}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="circle green">{{topData.total_done_questions}}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="circle green">{{topData.personal_questions}}</span>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card>
      <div ref="box" class="card-bottom"></div>
    </el-card>
  </div>
</template>

<script>
import { getTop, statistics } from "@/api/chart";
// 引入echarts包
import echarts from "echarts";
export default {
  name: "index",
  data() {
    return {
      topData: {}
    };
  },
  created() {
    getTop().then(res => {
      this.topData = res.data.data;
    });
  },
  mounted() {
    // 初始化echarts实例
    var myChart = echarts.init(this.$refs.box);
    statistics().then(res => {
      // 把数据里的公司名单独提取出来
      // map是ES6里面的方法
      // item:数据中的每一项
      let names = res.data.data.map(item => {
        // 把每个元素的name提取出来组成一个新数组
        return item.name;
      });
      // 准备一个配置
      var option = {
        // 标题
        title: {
          text: "整个数据"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 10,
          data: names
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data.data
          }
        ]
      };
      // 让mychart应用这个option配置
      myChart.setOption(option);
    });
  }
};
</script>

<style lang='less'>
.card-top {
  height: 149px;
  margin-bottom: 20px;

  ul {
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;

    li {
      display: flex;
      flex-direction: column;

      .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        border: 1px solid #2281db;
        border-radius: 50%;
        font-size: 20px;

        &.orange {
          border: 1px solid #f0b1a0;
        }

        &.green {
          border: 1px solid #87c197;
        }
      }

      span {
        text-align: center;
      }
    }
  }
}
.card-bottom {
  height: 500px;
}
</style>
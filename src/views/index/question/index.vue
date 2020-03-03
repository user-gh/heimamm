<template>
  <div class="question-warp">
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <subjectSelect v-model="formInline.subject"></subjectSelect>
        </el-form-item>

        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业">
          <buisinessSelect v-model="formInline.enterprise"></buisinessSelect>
        </el-form-item>

        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker v-model="formInline.create_date " type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <br />
        <el-form-item label="标题" class="title-item">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="questionAdd">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部卡片 -->
    <el-card class="bottom-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="subject_name" label="学科.阶段">
          <template slot-scope="scope">
            <!-- 过滤器 -->
            {{ scope.row | formatSubjectStep}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1 ">单选</span>
            <span v-else-if="scope.row.type == 2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="135px">
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text">启用</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <question-add ref="questionAdd" />
  </div>
</template>

<script>
import { questionList } from "@/api/question";
// 导入新增对话框
import questionAdd from "./commponts/questionAdd.vue";
export default {
  name: "question",
  components: {
    questionAdd
  },
  data() {
    return {
      formInline: {},
      // 表格绑定的数据源
      tableData: [],
      size: 10,
      page: 1,
      total: 0
    };
  },
  methods: {
    // 获取题库列表
    getList() {
      // 获取题库列表
      questionList({
        page: this.page,
        limit: this.size
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    handleSizeChange(size) {
      // 把改变后的页容量赋值给this.size
      this.size = size;
      // 只要页容量改变，都应该从第一页重新显示
      this.page = 1;
      // 根据新的页容量请求数据
      this.getList();
    },
    handleCurrentChange(page) {
      // 把改变后的页码赋值给this.page
      this.page = page;
      // 根据新的页码请求数据
      this.getList();
    },
    // 新增试题点击事件
    questionAdd() {
      // 打开新增试题对话框
      this.$refs.questionAdd.dialogFormVisible = true;
    }
  },
  created() {
    // 调用获取题库列表的方法
    this.getList();
  },
  // 过滤器
  filters: {
    formatSubjectStep(val) {
      // 学科名: val.subject_name
      // 阶段名:  if 判断
      let stepName = "";
      if (val.step == 1) {
        stepName = "初级";
      } else if (val.step == 2) {
        stepName = "中级";
      } else {
        stepName = "高级";
      }
      return val.subject_name + " · " + stepName;
    }
  }
};
</script>

<style lang='less' >
.question-warp {
  .el-form--inline {
    /* 找到除了最后一个el-form-item下面的所有  el-form-item__content*/
    .el-form-item:not(:last-child) .el-form-item__content {
      width: 150px;
    }

    /* /* 找到标题那一栏里的内容,设置它的内容宽度为388px */
    .el-form-item.title-item .el-form-item__content {
      width: 388px;
    }

    .el-form-item .el-form-item__content .el-date-editor {
      width: 150px;
    }
    /* 设置每个表单元素前面文字的左右内边距 */
    .el-form-item__label {
      padding-right: 31px;
      padding-left: 30px;
    }
    /* 设置卡片的内边距 */
    .el-card__body {
      padding-left: 0;
    }
  }
  .bottom-card {
    margin-top: 21px;
  }
  .el-pagination {
    margin-top: 31px;
    margin-bottom: 22px;
  }
}
</style>
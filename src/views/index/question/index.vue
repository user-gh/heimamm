<template>
  <div class="question-warp">
    <el-card>
      <el-form destroy-on-close ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科" prop='subject'>
          <subjectSelect :isSearch='true' v-model="formInline.subject"></subjectSelect>
        </el-form-item>

        <el-form-item label="阶段" prop='step'>
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业" prop='enterprise'>
          <buisinessSelect :isSearch='true' v-model="formInline.enterprise"></buisinessSelect>
        </el-form-item>

        <el-form-item label="题型" prop='type'>
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="所有题型" value=""></el-option>
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度" prop='difficulty'>
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作者" prop='username'>
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop='status'>
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="所有状态" value=""></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value='0'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" prop='create_date'>
          <el-date-picker v-model="formInline.create_date " type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <br />
        <el-form-item label="标题" class="title-item" prop='title'>
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
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
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="135px">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 1 ? '禁用' : '启用'}}</el-button>
            <el-button
              type="text"
              @click="doDel(scope.row)"
              v-if="['超级管理员','管理员'].includes($store.state.role)"
            >删除</el-button>
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
    <question-edit ref="questionEdit" />
  </div>
</template>

<script>
import { questionList, questionStatus, questionDel } from "@/api/question";
// 导入新增对话框
import questionAdd from "./commponts/questionAdd.vue";
import questionEdit from "./commponts/questionEdit.vue";
export default {
  name: "question",
  components: {
    questionAdd,
    questionEdit
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
        limit: this.size,
        ...this.formInline
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
    },
    // 编辑按钮点击事件
    showEdit(item){
      // 赋值给编辑对话框里的form属性
      this.$refs.questionEdit.form = {...item};
      // 把城市city 从字符串转成数组
      this.$refs.questionEdit.form.city =  this.$refs.questionEdit.form.city.split(',');
      // 把多选multiple_select_answer从字符串转成数组
      this.$refs.questionEdit.form.multiple_select_answer =  this.$refs.questionEdit.form.multiple_select_answer.split(',');
      // 显示对话框
      this.$refs.questionEdit.dialogFormVisible = true;

    },
    // 改变状态的点击事件
    changeStatus(item) {
      // 调用设置题库列表题目状态的方法
      questionStatus({
        id: item.id
      }).then(() => {
        this.$message.success("状态修改成功");
        // 调用获取学科列表的方法
        this.getList();
      });
    },
    // 重置表单
    clearSearch() {
      // 表单对象的重置方法
      // 要想表单有重置方法,要给每一项加prop属性
      this.$refs.formInline.resetFields();
      // 根据最新的表单内容重新调用请求
      this.page = 1;
      this.getList();
    },
    // 搜索点击事件
    doSearch(){
      this.getList();
    },
    // 删除题目的点击事件
    doDel(item) {
      // 调用删除题目对的方法
      questionDel({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          // 如果是最后一页，那么刷新上一页
          if (this.tableData.length == 1) {
            this.page--;
          }
          // 如果是最后为 0
          if (this.page == 0) {
            this.page = 1;
          }
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
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
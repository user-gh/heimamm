<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <!-- inline控制表单是否为行内表单,默认是false -->
      <el-form ref="formInline" inline :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="short" v-model="formInline.eid"></el-input>
        </el-form-item>

        <el-form-item label="企业名称" prop="name">
          <el-input class="long" v-model="formInline.name"></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select class="long" v-model="formInline.status" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button @click="showAdd" type="primary" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面卡片 -->
    <el-card class="box-card">
      <!-- 表格 
        data:指定表格的数据源, 设置表格显示那些数据
        label:设置这一列的列名
        prop:控制这一列显示什么属性
      -->
      <el-table :data="tableData" style="width: 100%">
        <!-- 设置表格的列数 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{ scope.row.create_time | formaTime }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" v-if="['超级管理员','管理员'].includes($store.state.role)">
          <!-- 如果使用按钮，最好使用自定义列,可方便拿到这行的数据 -->
          <template slot-scope="scope">
            <!-- 
               scope.$index:拿到当前行的索引
               scope.row:   拿到当前行的数据
            -->
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
      <!-- 分页 -->
      <!-- 
         current-page:设置当前页
         page-sizes:设置页容量,每页显示多少条
         page-size:设置当前页容量是多少
         layout:设置分页的布局效果,一般不改
         total:设置数据总条数(数据对的总数量)
         size-change:页容量改变的事件 
                      只要页容量改变触发
         current-change:当前页发送改变的事件
                       只要当前页改变就触发
         background:会有灰色的背景色
      -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 使用组件  -->
    <!-- <buisinessAdd ref="addDialog"></buisinessAdd>
    <buisiness-edit ref="editDialog"></buisiness-edit>-->
    <buisiness-dialog ref="buisinessDialog"></buisiness-dialog>
  </div>
</template>

<script>
// 导入学科模块的接口方法文件
import {
  buisinessList,
  buisinessStatus,
  buisinessDel
} from "@/api/buisiness.js";
// // 导入 新增学科组件文件
// import buisinessAdd from './components/buisinessAdd.vue'
// // 导入 编辑学科组件文件
// import buisinessEdit from './components/buisinessEdit.vue'
import buisinessDialog from "./components/buisinessDialog";
export default {
  name: "index",
  // 注册组件
  components: {
    // buisinessAdd,
    // buisinessEdit
    buisinessDialog
  },
  data() {
    return {
      formInline: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: [],
      // 当前页码
      Page: 1,
      // 页容量
      size: 10,
      // 数据总量
      total: 0,
      // 判断是否是第一次
      // isFrist:true
      // 记录上一次dian的是哪一行
      oldItem: null
    };
  },
  methods: {
    // 页容量改变触发
    // 参数是改变后的页容量(val)
    handleSizeChange(size) {
      // 把改变后的页容量赋值给this.size
      this.size = size;
      // 只要页容量改变，都应该从第一页重新显示
      this.page = 1;
      // 根据新的页容量请求数据
      this.getList();
    },
    // 当前页码改变就触发
    // 参数是改变后的页码(val)
    handleCurrentChange(page) {
      // 把改变后的页码赋值给this.page
      this.page = page;
      // 根据新的页码请求数据
      this.getList();
    },
    // 封装的获取学科列表的函数
    getList() {
      // 调用获取学科列表的接口方法
      buisinessList({
        // 页码
        page: this.page,
        // 页容量是多少，就查多少
        limit: this.size,
        // rid:this.formInline.rid,
        // name:this.formInline.name,
        // username:this.formInline.username,
        // status:this.formInline.status
        ...this.formInline
      }).then(res => {
        // 设置表格数据源
        this.tableData = res.data.data.items;
        // 设置表格数据总量
        this.total = res.data.data.pagination.total;
      });
    },
    // 修改状态的点击事件
    changeStatus(item) {
      buisinessStatus({
        id: item.id
      }).then(() => {
        this.$message.success("状态修改成功");
        // 调用获取学科列表的方法
        this.getList();
      });
    },
    // 搜索按钮的点击事件
    doSearch() {
      this.getList();
    },
    // 重置筛选点击事件
    clearSearch() {
      // 表单对象的重置方法
      // 要想表单有重置方法,要给每一项加prop属性
      this.$refs.formInline.resetFields();
      // 根据最新的表单内容重新调用请求
      this.page = 1;
      this.getList();
    },
    // 编辑按钮点击事件
    showEdit(item) {
      // console.log(item)
      // console.log(this.oldItem)
      //  显示出编辑窗口
      this.$refs.buisinessDialog.dialogFormVisible = true;
      // 把是否添加的状态改为false
      this.$refs.buisinessDialog.isAdd = false;
      if (item != this.oldItem) {
        // console.log("进入")
        this.$refs.buisinessDialog.form = { ...item };
        // 并把记录上一行数据记录成当前行的数据
        this.oldItem = item;
      }
    },
    //  删除点击事件
    doDel(item) {
      buisinessDel({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          // 如果是最后一页，那么刷新上一页
          if (this.tableData.length == 1) {
            // 代表上一页
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
    },
    // 新增企业的点击事件
    showAdd() {
      this.$refs.buisinessDialog.dialogFormVisible = true;
      // 标记为新增状态
      this.$refs.buisinessDialog.isAdd = true;
      // 清空表单数据
      this.$refs.buisinessDialog.form = {};
      //当点击状态不为编辑的时候，清空原始编辑数据，为初始状态
      this.oldItem = null;
    }
  },
  created() {
    // 调用获取学科列表的方法
    this.getList();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 100px;
}

.long {
  width: 149px;
}
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
</style>
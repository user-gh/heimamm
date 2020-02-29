<template>
  <el-dialog
    width="477px"
    center
    :title=" isAdd ? '新增用户':'编辑用户' "
    :visible.sync="dialogFormVisible"
  >
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="role" label="角色" :label-width="formLabelWidth">
        <el-select @click="form.role_id = form.role" v-model="form.role" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userAdd, userEdit } from "@/api/user.js";
export default {
  name: "userDialog",
  data() {
    return {
      form: {},
      dialogFormVisible: false,
      formLabelWidth: "80px",
      isAdd: true,
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    //  新增用户确定按钮点击事件
    save() {
      // 整个表单验证
      this.$refs.form.velidate(v => {
        if (v) {
          if (this.isAdd) {
            // 调用新增方法接口发送请求
            userAdd(this.form).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.dialogFormVisible = false;
                //  调用父组件的刷新方法
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            // 编辑方法接口发送请求
            userEdit(this.form).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("编辑成功");
                this.dialogFormVisible = false;
                //  调用父组件的刷新方法
                this.$parent.getList();
              } else {
                  this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
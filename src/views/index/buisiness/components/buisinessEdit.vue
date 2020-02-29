<template>
  <el-dialog center title="编辑企业" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="rid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doEdit" >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // 导入编辑接口方法文件
import  { buisinessEdit } from '@/api/buisiness'
export default {
  name: "subjectEdit",
  data() {
    return {
      //  对话框显示或隐藏的属性
      dialogFormVisible: false,
      formLabelWidth: "80px",
      //  跟表单绑定的对象
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    //  编辑确定按钮点击事件
    doEdit(){
      buisinessEdit(this.form).then(res => {
        console.log(res);
        if(res.data.code == 200){
          this.$message.success('编辑成功');
          this.dialogFormVisible = false;
          this.$parent.getList();
        }else{
          this.$message.error(res.data.message)
        }
      })
      
    }
  }
};
</script>

<style>
</style>
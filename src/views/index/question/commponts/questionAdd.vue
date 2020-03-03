<template>
  <el-dialog class="my-add-dialog" fullscreen title="新增题库" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="学科" :label-width="formLabelWidth">
        <subjectSelect v-model="form.subject"></subjectSelect>
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择阶段">
          <el-option label="初级" value="1"></el-option>
          <el-option label="中级" value="2"></el-option>
          <el-option label="高级" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth">
        <buisinessSelect v-model="form.enterprise"></buisinessSelect>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <China-aear v-model="form.city" />
      </el-form-item>
      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
       <el-form-item>
         <div class="Line">
           <el-divider class="line"></el-divider>
         </div>
       </el-form-item>
       <!--  富文本 -->
       <el-form-item class="myeditor">
        <div class="Editor">
          <my-editor v-model="form.short_answer"/>
        </div>
       </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入省市联动数据
import ChinaAear from './ChinaAear.vue';
import myEditor from './myEditor.vue'
export default {
  name: "questionAdd",
  components:{
    ChinaAear,
    myEditor
  },
  data() {
    return {
      form: {},
      dialogFormVisible: false,
      formLabelWidth: "306px",
      radio:3
    };
  }
};
</script>

<style lang='less'>
.my-add-dialog {
  .el-select {
    width: 364px;
  }
  .el-form-item__label {
    padding-right: 41px;
  }
  .Line{
    display: flex;
    justify-content: center;
  }
  .line{
    width: 835px;
  }
  .myeditor{
     display: flex;
    justify-content: center;
    
    .Editor{
      width: 835px;
    }
  }
}
</style>
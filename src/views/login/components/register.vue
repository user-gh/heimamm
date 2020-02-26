<template>
  <!-- 注册对话框 -->
 <el-dialog title="用户注册" width='603px' center :visible.sync="dialogFormVisible">

  <el-form :model="form" :rules="rules" >

     <el-form-item label="昵称" :label-width="formLabelWidth" prop='name'>
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="手机" :label-width="formLabelWidth" prop='phone'>
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>  

     <el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
      <el-input show-password v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
            <el-col :span = '16'>
                 <el-input v-model="form.imgCode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span = '7' :offset='1'>
                <img class="img_code" src="../images/code.png" alt="">
            </el-col>
        </el-row>
    </el-form-item>

     <el-form-item label="验证码" :label-width="formLabelWidth">
       <el-row>
            <el-col :span = '16'>
                 <el-input v-model="form.rCode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span = '7' :offset='1'>
               <el-button>获取用户验证码</el-button>
            </el-col>
        </el-row>
    </el-form-item>

  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
  
</el-dialog>


</template>

<script>
export default {
  name: "register",
  data() {
    return {
    // 是否显示对话框 
      dialogFormVisible: false,
    //   s设置文字宽度
      formLabelWidth:'65px',
    // 跟表单元素双向绑定的对象
      form: {
          name:'',
          email:'',
          phone:'',
          password:''
      },
    // 规则对象
      rules:{
          name:[
              { required:true,messsage:'昵称不能为空',trigger:'blur' }
          ],
          email:[
              { required:true,messsage:'邮箱不能为空',trigger:'blur' },
              { pattern:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message:'邮箱格式不正确',trigger:'blur'}
          ],
          phone:[
              { required:true,messsage:'手机号不能为空',trigger:'blur' },
              { pattern:/0?(13|14|15|18|17)[0-9]{9}/,message:'手机号格式错误',trigger:'blur' }
          ],
          password:[
              { required:true,messsage:'密码不能为空',trigger:'blur' },
              { min:5,max:14,message:'长度在5-14之间',trigger:'change' }
          ],
      }
    };
  }
};
</script>

<style lang = 'less'>

.el-dialog__header {
  background: linear-gradient(to right, #03c2fa, #1197fb);
  color: #fff;
}

.el-dialog__title {
  color: #fff;
  font-size: 17px;
}

.img_code{
    width: 100%;
    height: 41px;
    vertical-align: top;
}
</style>
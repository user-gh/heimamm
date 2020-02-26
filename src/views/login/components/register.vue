<template>
  <!-- 注册对话框 -->
  <el-dialog title="用户注册" width="603px" center :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules">
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="img_code" :src="picCodeUrl" @click="getNewCode" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button
              :disabled="sec != 0"
              @click="getPhoneCode"
            >{{sec == 0 ? '获取用户验证码':'还有' + sec + '秒'}}</el-button>
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
// 导包
import axios from 'axios'

export default {
  name: "register",
  data() {
    return {
      // 倒计时的秒数
      sec: 0,
      // 图形验证码接口地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 是否显示对话框
      dialogFormVisible: false,
      //   s设置文字宽度
      formLabelWidth: "65px",
      // 跟表单元素双向绑定的对象
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        imgCode:''
      },
      // 规则对象
      rules: {
        name: [{ required: true, messsage: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, messsage: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, messsage: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, messsage: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5-14之间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //   图片验证码点击事件
    getNewCode() {
      //   浏览器缓存机制
      // 解决方案
      //   1.随机数 (Math.random())
      //   2.时间戳 (Date.now())
      this.picCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + Date.now();
    },
    //   获取用户验证码点击事件
    getPhoneCode() {
      this.sec = 60;
      //写一个每隔1秒触发的计时器
      let timer = setInterval(() => {
        this.sec--;
        // 如果倒计时为0，停止计时器
        if (this.sec == 0) {
          clearInterval(timer);
        }
      }, 1000);
    // 发请求获取手机验证码
    // axios如果发跨域请求，默认不会携带cookie
    axios({
        url: process.env.VUE_APP_URL + '/sendsms',
        method:'post',
        data: { 
            code:this.form.imgCode,
            phone:this.form.phone
        },
        // 允许携带cookie
        withCredentials:true
    }).then(res=>{
        //成功回调
        if(res.data.data == 200){
            // 获取验证码成功
            this.$message.success('获取验证码成功,验证码为'+ res.data.data.captcha);
        }else{
            this.$message.warining(res.data.message);
        }
    });
    } 
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

.img_code {
  width: 100%;
  height: 41px;
  vertical-align: top;
}
</style>
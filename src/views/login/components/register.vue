<template>
  <!-- 注册对话框 -->
  <el-dialog title="用户注册" width="603px" center :visible.sync="dialogFormVisible">
    <!-- 注册表单 -->
    <el-form ref="regForm" :model="form" :rules="rules">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <!-- 用户头像上传 -->
        <!-- 
        action:上传图片的接口地址
        show-file-list:上传后是否要显示上传文件列表,给false代表不显示
        on-success：上传成功调用的回调函数
        before-upload：上传之前调用的函数
        -->
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- 是为了显示上传成功后的图片 -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <!-- 我们看到的 + 号 -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

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

      <el-form-item label="图形码" :label-width="formLabelWidth" prop="imgCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="img_code" :src="picCodeUrl" @click="getNewCode" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
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
      <el-button type="primary" @click="doRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 register
import { sendSMS, register } from "@/api/register.js";

export default {
  name: "register",
  data() {
    return {
      // 要上传图片的接口地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      //  上传后的图片路径
      imageUrl: "",
      // 倒计时的秒数
      sec: 0,
      // 图形验证码接口地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 是否显示对话框
      dialogFormVisible: false,
      //  设置文字宽度
      formLabelWidth: "65px",
      // 跟表单元素双向绑定的对象
      form: {
        //   头像
        avatar: "",
        // 用户名
        name: "",
        // 邮箱
        email: "",
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 图形验证码
        imgCode: "",
        // 手机验证码
        rcode: ""
      },
      // 规则对象
      rules: {
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        // 图片验证码
        imgCode: [
          { required: true, message: "图片验证码不能为空", trigger: "blur" },
          // { min:4,max:4,message:'图片验证码只能是4位',trigger:'blur' }
          { len: 4, message: "图片验证码只能是4位", trigger: "blur" }
        ],
        // 手机验证码
        rcode: [
          { required: true, message: "手机号验证码不能为空", trigger: "blur" },
          // { min:4,max:4,message:'手机号验证码只能为4位',trigger:'blur' }
          { len: 4, message: "手机号验证码只能为4位", trigger: "blur" }
        ],
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
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
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5-14之间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //  确定按钮点击事件
    doRegister() {
      //   要找到表单对象(首先给表单加ref属性 )
      this.$refs.regForm.validate(v => {
        if (v) {
          // 调用注册按钮发送axios请求的方法
          register({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.imgCode
          }).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
                this.$message.success('注册成功');
                // 重置表单,它只重置表单元素
                // 而img不是表单元素，所以只要img绑定的url还在，它就一直显示
                this.$refs.regForm.resetFields();
                this.imageUrl = '';
              // 注册成功，关闭对话框
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    //   图片验证码点击事件
    getNewCode() {
      //   浏览器缓存机制
      // 解决方案
      //   1.随机数 (Math.random())
      //   2.时间戳 (Date.now())
      this.picCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&sb" + Date.now();
    },
    //   获取用户验证码点击事件
    getPhoneCode() {
      // 判断手机是否合法
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        return this.$message.error("手机号码格式不正确");
      }
      // 判断验证码是否合法
      if (this.form.imgCode.length != 4) {
        return this.$message.error("验证码格式不正确");
      }
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
      // 导入一个给接口对象就可以了
      sendSMS({
        code: this.form.imgCode,
        phone: this.form.phone
      }).then(res => {
        //成功回调
        if (res.data.code == 200) {
          // 获取验证码成功
          this.$message.success(
            "获取验证码成功,验证码为" + res.data.data.captcha
          );
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 图片上传成功调用的回调函数
    // res就是响应报文
    // file就是文件信息
    handleAvatarSuccess(res, file) {
      //  把图片转换成临时路径
      this.imageUrl = URL.createObjectURL(file.raw);
      //  上传成功后还要给avatar赋值
      this.form.avatar = res.data.file_path;
      // 这个时候我们想办法单独对这个属性做一次校验
      this.$refs.regForm.validateField("avatar");   
    },
    // 图片上传之前调用的回调函数
    beforeAvatarUpload(file) {
      // 判断文件的类型
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      // 判断文件的大小
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像文件只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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

.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-upload {
  text-align: center;
}
</style>
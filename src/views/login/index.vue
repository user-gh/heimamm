<template>
  <div class="page-center">
    <!-- 左侧登录盒子 -->
    <div class="login-box">
      <!-- 标题盒子 -->
      <div class="title-box">
        <img class="logo" src="./images/login_logo.png" alt />
        <span class="left-title">黑马面面</span>
        <span class="line"></span>
        <span class="right-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="43px">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
            v-model="form.password"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <!-- 第一列，放的是输入框 -->
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.code"></el-input>
            </el-col>
            <!-- 第二列 ，放的是验证码图片 -->
            <el-col :span="7">
              <img class="code" src alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="agree">
          <el-checkbox class="agree" v-model="form.agree">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="box-btn" type="primary" @click="doLogin">登录</el-button>
          <el-button class="box-btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 左侧图片 -->
    <img src="./images/login_banner_ele.png" alt />
    <!-- 注册对话框 -->
    <reg></reg>
  </div>
</template>

<script>
// 1.导入组件
import reg from "./components/register.vue";

// 3.在需要的地方写这个组件的标签
export default {
  // 2.注册组件
  components:{
    reg
  },
  name: "index",
  data() {
    return {
      // 跟表单双向绑定的数据
      form: {
        phone: "",
        password: "",
        code: "",
        agree: false
      },
      // 规则对象
      rules: {
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        agree: [
          // 多选框没有失去焦点，只有值发生改变事件
          // 因为checkbox其实他不可能为空，除非你赋值为空
          // 所以我们不能拿值是否为空来做验证了
          //  { required: true, message: '必须勾选同意用户协议', trigger: 'change' },
          {
            pattern: /true/,
            message: "必须勾选同意用户协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 给登录按钮添加点击事件(整个表单的验证,表单不能为空)
    doLogin() {
      // 找到表单对象，调用validate方法
      this.$refs.loginForm.validate(v => {
        if (v) {
          alert("全部通过");
        }
      });
    }
  }
};
</script>

<style>
.page-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    25deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
}

.login-box {
  width: 478px;
  height: 550px;
  padding-right: 41px;
  box-sizing: border-box;
  background: rgba(245, 245, 245, 1);
}

.title-box {
  display: flex;
  align-items: center;
  margin-top: 50px;
  margin-left: 48px;
  margin-bottom: 43px;
}

.title-box .logo {
  margin-right: 16px;
  width: 22px;
  height: 17px;
}

.title-box .left-title {
  margin-right: 14px;
  font-size: 22px;
}

.title-box .line {
  width: 1px;
  height: 28px;
  background: rgba(199, 199, 199, 1);
  margin-right: 12px;
}

.title-box .right-title {
  font-size: 21px;
}

.code {
  width: 100%;
  height: 42px;
  vertical-align: top;
}

.agree {
  display: flex;
  align-items: center;
}
.box-btn {
  width: 100%;
}

.box-btn:nth-child(2) {
  margin-top: 26px;
  margin-left: 0;
}
</style> 
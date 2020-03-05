<template>
  <el-dialog
    destroy-on-close
    class="my-add-dialog"
    fullscreen
    title="编辑题库"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="学科" :label-width="formLabelWidth" prop="subject">
        <subjectSelect v-model="form.subject"></subjectSelect>
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth" prop="step">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth" prop="enterprise">
        <buisinessSelect v-model="form.enterprise"></buisinessSelect>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
        <China-aear v-model="form.city" />
      </el-form-item>
      <el-form-item label="题型" :label-width="formLabelWidth" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-form-item label-width="0px">
        <div class="Line">
          <el-divider class="line"></el-divider>
        </div>
      </el-form-item>
      <!--  富文本 -->
      <el-form-item class="myeditor" label="试题标题" prop="title">
        <div class="Editor">
          <my-editor v-model="form.title" />
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.type == 1"
        label="单选"
        :label-width="formLabelWidth"
        prop="single_select_answer"
      >
        <el-radio-group v-model="form.single_select_answer">
          <!-- 导入选项组件 -->
          <opctionItem
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-else-if="form.type == 2"
        label="多选"
        :label-width="formLabelWidth"
        prop="multiple_select_answer"
      >
        <div>
          <el-checkbox-group v-model="form.multiple_select_answer">
            <!-- 导入选项组件 -->
            <opctionItem
              :isRadio="false"
              v-for="(item, index) in form.select_options"
              :key="index"
              :label="item.label"
              :text.sync="item.text"
              :image.sync="item.image"
            />
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item v-else label="简答" :label-width="formLabelWidth" prop="short_answer">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer"></el-input>
      </el-form-item>
      <el-form-item label-width="0px">
        <div class="Line">
          <el-divider class="line"></el-divider>
        </div>
      </el-form-item>
      <el-form-item label="解析视频" :label-width="formLabelWidth" prop="video">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
        </el-upload>
        <video :src="videoUrl" controls></video>
      </el-form-item>
      <el-form-item>
        <div class="Line">
          <el-divider class="line"></el-divider>
        </div>
      </el-form-item>
      <!--  富文本 -->
      <el-form-item class="myeditor" label="答案解析" prop="answer_analyze">
        <div class="Editor">
          <my-editor v-model="form.answer_analyze" />
        </div>
      </el-form-item>
      <el-form-item label="答案备注" :label-width="formLabelWidth" prop="remark">
        <el-input class="que-input" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入省市联动数据
import ChinaAear from "./ChinaAear.vue";
import myEditor from "./myEditor.vue";
import opctionItem from "./opctionItem.vue";
// 导入编辑的接口
import { questionEdit } from "@/api/question.js";
export default {
  name: "questionAdd",
  components: {
    ChinaAear,
    myEditor,
    opctionItem
  },
  data() {
    return {
      rules: {
        title: {
          required: true,
          message: "标题不能为空",
          trigger: "blur"
        },
        subject: {
          required: true,
          message: "学科不能为空",
          trigger: "blur"
        },
        step: {
          required: true,
          message: "阶段不能为空",
          trigger: "blur"
        },
        enterprise: {
          required: true,
          message: "企业不能为空",
          trigger: "blur"
        },
        city: {
          required: true,
          message: "城市不能为空",
          trigger: "blur"
        },
        type: {
          required: true,
          message: "题型不能为空",
          trigger: "blur"
        },
        difficulty: {
          required: true,
          message: "难度不能为空",
          trigger: "blur"
        },
        short_answer: {
          required: true,
          message: "试题标题不能为空",
          trigger: "blur"
        },
        single_select_answer: {
          required: true,
          message: "单选按钮不能为空",
          trigger: "blur"
        },
        multiple_select_answer: {
          required: true,
          message: "多选按钮不能为空",
          trigger: "blur"
        },
        answer_analyze: {
          required: true,
          message: "答案解析不能为空",
          trigger: "blur"
        },
        remark: {
          required: true,
          message: "答案备注不能为空",
          trigger: "blur"
        }
      },
      form: {
        type: "1",
        // 单选绑定答案
        single_select_answer: "",
        // 多选绑定答案记得给数组
        multiple_select_answer: [],
        // 简答题绑定答案
        short_answer: "",
        // 跟选项绑定的数组
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      // 上传的接口地址
      uploadUrl: process.env.VUE_APP_URL + "/question/upload ",
      // 预览视频
      videoUrl: "",
      dialogFormVisible: false,
      formLabelWidth: "306px"
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.videoUrl = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传sp大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 保存按钮点击事件
    save() {
      // 整个表单验证，每一项必须加prop属性
      this.$refs.form.validate(v => {
        if (v) {
          questionEdit(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success("编辑题目完成");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 重置表单元素,自己封装的不会被清除
              this.$refs.form.restFields();
              // 刷新表格列表
              this.$parent.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
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
  .Line {
    display: flex;
    justify-content: center;
  }
  .line {
    width: 835px;
  }
  .myeditor {
    display: flex;
    justify-content: center;

    .Editor {
      width: 835px;
    }
  }
  .avatar-uploader {
    text-align: left;
  }

  .que-input {
    width: 754px;
    height: 52px;
  }
}
</style>
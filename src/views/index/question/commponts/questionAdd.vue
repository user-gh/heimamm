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
          <el-radio label="1">单选</el-radio>
          <el-radio label="2">多选</el-radio>
          <el-radio label="3">简答</el-radio>
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
      <el-form-item label-width="0px">
        <div class="Line">
          <el-divider class="line"></el-divider>
        </div>
      </el-form-item>
      <!--  富文本 -->
      <el-form-item class="myeditor">
        <div class="Editor">
          <my-editor v-model="form.short_answer" />
        </div>
      </el-form-item>
      <el-form-item v-if="form.type == 1" label="单选" :label-width="formLabelWidth">
        <el-radio-group v-model="form.single_select_answer">
          <div class="opction-box" v-for="(item, index) in form.select_options" :key="index">
            <el-radio :label="item.label"></el-radio>
            <el-input class="input-box" type="text" v-model="item.text"></el-input>
            <!-- 
              action:上传的路径 
            -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-else-if="form.type == 2" label="多选" :label-width="formLabelWidth">
        <div>
          <el-checkbox-group v-model="form.multiple_select_answer">
            <el-checkbox label="A"></el-checkbox>
            <el-checkbox label="B"></el-checkbox>
            <el-checkbox label="C"></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item v-else label="简答" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer"></el-input>
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
import ChinaAear from "./ChinaAear.vue";
import myEditor from "./myEditor.vue";
export default {
  name: "questionAdd",
  components: {
    ChinaAear,
    myEditor
  },
  data() {
    return {
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
      // 预览图片
      imgUrl: "",
      dialogFormVisible: true,
      formLabelWidth: "306px"
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  .opction-box {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  .input-box {
    width: 476px;
    height: 40px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 41px;
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
}
</style>
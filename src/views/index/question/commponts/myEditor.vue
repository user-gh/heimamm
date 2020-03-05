<template>
  <div>
    <div class="toolbar" ref="toolbar"></div>
    <div class="content" ref="content">{{value}}</div>
  </div>
</template>
<script>
// 导入富文本包
import wangEditor from "wangeditor";
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    let editor = new wangEditor(this.$refs.toolbar, this.$refs.content);
    editor.customConfig.onchange = html => {
      this.$emit("input", html);
    };
    editor.create();
  }
};
</script>
<style>
.toolbar {
  border: 1px solid #ccc;
}
.content {
  border: 1px solid #ccc;
}
</style>
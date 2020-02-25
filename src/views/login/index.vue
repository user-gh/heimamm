<template>
  <div class="page-center">
    <div class="login-box"></div>
    <img src="./images/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
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
  background: rgba(245, 245, 245, 1);
}
</style>
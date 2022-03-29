<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="carrentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><user-filled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <!-- ref模板语法,获取组件实例 -->
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-button" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import LoginPhone from './login-phone.vue'
import LoginAccount from './login-account.vue'

export default defineComponent({
  components: {
    LoginPhone,
    LoginAccount
  },
  setup() {
    const isKeepPassword = ref(true)
    // 拿到login-account组件实例.
    // 首先需要通过 typeof 得到其类型，再使用 TypeScript 内置的 InstanceType 工具类型来获取其实例类型
    const accountRef = ref<InstanceType<typeof LoginAccount> | null>(null)
    const phoneRef = ref<InstanceType<typeof LoginAccount> | null>(null)
    const carrentTab = ref('account')

    const handleLoginClick = () => {
      if (carrentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value) // 执行login-account组件实例中的loginAction
      } else {
        console.log('phoneRef调用')
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      phoneRef,
      carrentTab
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 160px;
  width: 320px;
  .title {
    text-align: center;
  }
}
.account-control {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.login-button {
  width: 100%;
  margin-top: 10px;
}
</style>

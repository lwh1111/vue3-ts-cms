<template>
  <div class="page-search">
    <wh-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="footer">
          <el-button type="primary" @click="handleQueryClick">搜索</el-button>
          <el-button @click="handleResetClick">重置</el-button>
        </div>
      </template>
    </wh-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import WhForm from '@/base-ui/form'

export default defineComponent({
  components: {
    WhForm
  },
  emit: ['resetBtnClick', 'queryBtnClick'],
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1. 优化一： formData里的属性应该动态生成
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    // 双向绑定最好用ref
    const formData = ref(formOriginData)

    // 2. 优化二：当用户点击了重置
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3. 优化三：当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.footer {
  text-align: right;
  padding: 0 30px 18px 0;
}
</style>

<template>
  <div class="nav-header">
    <el-icon size="28px" class="header-icon" @click="handleFoldClick"
      ><component :is="isFold ? 'Expand' : 'fold'"
    /></el-icon>
    <div class="content">
      <wh-breadcrumb :breadcrumb="breadcrumb" />
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import WhBreadcrumb from '@/base-ui/breadcrumb'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumb } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    WhBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据 [{name: , path: }]
    const store = useStore()
    const route = useRoute()
    const breadcrumb = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return pathMapBreadcrumb(userMenus, currentPath)
    })

    return {
      handleFoldClick,
      isFold,
      breadcrumb
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .header-icon {
    margin-top: 2px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>

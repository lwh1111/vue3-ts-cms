<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-hrader @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHrader from '@/components/nav-header'

// defineComponent让组件更好地支持ts，没啥用
export default defineComponent({
  components: {
    NavMenu,
    NavHrader
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return { handleFoldChange, isCollapse }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content {
  height: 100%;
}

.page-header {
  display: flex;
  height: 48px;
  background: #ffffff;
  color: #333;
  text-align: center;
  align-items: center;
}

.page-content {
  height: calc(100% - 48px);
  color: #333;
  text-align: center;
  background: #f5f7f9;

  .page-info {
    background: #ffffff;
    border-radius: 12px;
  }
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  transition: width 0.3s linear;
  border-right: 1px solid #eeebf5;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

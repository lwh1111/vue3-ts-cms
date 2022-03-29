<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="logo" class="img" />
      <span class="title">后台管理</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#6e6f80"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 一级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <!-- 一级菜单的标题，使用了具名插槽 -->
            <template #title>
              <el-icon v-if="item.icon">
                <!-- 用is切换不同组件 -->
                <component :is="item.icon.substring(8)" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 二级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icom" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

// import type { IRootState } from '@/store/types'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus) // computed拿到的是ref类型

    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path

    // data
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')

    // event handle
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    return { userMenus, handleMenuItemClick, defaultValue }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #fff;

  // logo
  .logo {
    display: flex;
    height: 48px;
    padding: 0 10px;
    cursor: pointer;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 28px;
      margin: 0 12px 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #8761f5;
    }
  }

  // 目录菜单
  .el-menu {
    border-right: none;
  }

  .el-menu-item {
    min-width: 0;
    margin: 0 12px;
    padding: 0 40px 0 44px !important;
    border-radius: 10px;
  }

  .el-menu-item:hover {
    background-color: #f5f2ff;
    color: #8761f5;
    border-radius: 10px;
  }

  .el-menu-item.is-active {
    background-color: #8761f5;
    color: #fff;
  }
}
</style>

<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content">
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="role"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></page-content>
      <page-modal
        ref="pageModalRef"
        :modalConfig="modalConfig"
        title="新建角色"
        pageName="role"
        :defaultInfo="defaultInfo"
        :otherInfo="otherInfo"
      >
        <div class="menu-tree">
          <el-tree
            ref="elTreeRef"
            :data="menus"
            show-checkbox
            node-key="id"
            highlight-current
            :props="{ childrem: 'childrem', label: 'name' }"
            @check="handleCheckChange"
          >
          </el-tree>
        </div>
      </page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { ElTree } from 'element-plus'

import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 1. 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 角色菜单权限的回显
    const editCallback = (item: any) => {
      const leafKays = menuMapLeafKeys(item.menuList)
      // 等前面的leafKays绑定后再执行下一帧
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKays, false) // setCheckedKeys是ElTree的一个方法
      })
    }
    const [defaultInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList } // 一定要写成对象
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      defaultInfo,
      pageModalRef,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 20px;
}
</style>

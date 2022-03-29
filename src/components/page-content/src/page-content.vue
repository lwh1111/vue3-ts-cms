<template>
  <div class="page-content">
    <wh-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1. header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">
          新建{{ contentTableConfig.title.slice(0, 2) }}
        </el-button>
      </template>

      <!-- 2. 列中的插槽 -->
      <template #enable="scope">
        <!-- scope.row拿到行的数据 -->
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>
          <!-- 调用全局属性$filters -->
          {{ $filters.formatTime(scope.row.createAt) }}
        </span>
      </template>
      <template #updateAt="scope">
        <span>
          {{ $filters.formatTime(scope.row.updateAt) }}
        </span>
      </template>
      <template #handle="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            type="text"
            @click="handleEditClick(scope.row)"
          >
            <el-icon><edit /></el-icon>编辑
          </el-button>
          <el-button
            v-if="isDelete"
            type="text"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><delete /></el-icon>删除
          </el-button>
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </wh-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

import WhTable from '@/base-ui/table'

export default defineComponent({
  components: {
    WhTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0. 获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 双向绑定pageinfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 }) //currentPage从0开始
    watch(pageInfo, () => {
      getPageData()
    })

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return // 如果没有网络请求权限，不发送请求
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize, // 偏移量 = (当前页数-1) * 一页的数据量
          size: pageInfo.value.pageSize, // 一页请求的数据量
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3. 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4. 获取其它的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'enable') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handle') return false
        return true
      }
    )

    // 5. 删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch(`system/deletePageDataAction`, {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px 30px;
}
.el-icon {
  padding-right: 3px;
}
</style>

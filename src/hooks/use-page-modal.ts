import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(
  newCallback?: CallbackFn,
  editCallback?: CallbackFn
) {
  const defaultInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModal> | null>(null)
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // &&语法表示 当前面的有值的时候调用后面的
    newCallback && newCallback()
  }
  const handleEditData = (item: any) => {
    // item: 编辑的那一行的数据
    defaultInfo.value = { ...item } // { ...item }相当于浅拷贝了item
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCallback && editCallback(item)
  }

  return [defaultInfo, pageModalRef, handleNewData, handleEditData]
}

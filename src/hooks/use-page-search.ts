import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  // 获取page-content
  const pageContentRef = ref<InstanceType<typeof PageContent> | null>(null)
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick] // 可以看作是ts的元组?
}

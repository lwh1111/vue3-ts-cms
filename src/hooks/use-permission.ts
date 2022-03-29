import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permission = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`

  // !! 转换为布尔值
  return !!permission.find((item: any) => item === verifyPermission)
}

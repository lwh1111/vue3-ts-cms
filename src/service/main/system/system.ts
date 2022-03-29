import whRequest from '@/service'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo?: any) {
  return whRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return whRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return whRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return whRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}

import { InjectionKey } from 'vue'
import { ILoginState } from './login/types'
import { Store } from 'vuex'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/type'

// 为 rootstore 声明类型
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule

// 定义 injection key
export const key: InjectionKey<Store<IStoreType>> = Symbol()

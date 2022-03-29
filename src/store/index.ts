import { createStore, useStore as baseUseStore } from 'vuex'
import type { IRootState } from './types'
import { key } from './types'

import login from './login/login' // 注册login模块
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'by',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntirMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    // InitialData： 初始化数据  getInitialDataAction在login拿到token后调用
    async getInitialDataAction({ commit }) {
      // 1. 请求部门和角色数据
      const departentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })

      const { list: departmentList } = departentResult.data // list: departmentList 是es6的别名语法
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      // 请求菜单权限数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2. 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntirMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

// 对store里的东西做初始化
export function setupStore() {
  store.dispatch('login/laodLocalLogin')
  // store.dispatch('getInitialDataAction')
}

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}

export default store

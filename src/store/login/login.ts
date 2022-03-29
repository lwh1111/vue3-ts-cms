import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserMenusByRoleId,
  requestUsrInfoById
} from '@/service/login/login'
import localCache from '@/utils/cache'
// 在ts文件中使用vueRouter 不能用import { useRouter } from 'vue-router'
import router from '@/router' // 直接导入router

import type { ILoginState } from './types'
import type { IRootState } from '../types'
import type { IAccount } from '@/service/login/types'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'

const loginModuel: Module<ILoginState, IRootState> = {
  namespaced: true, //命名空间
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 每次store拿到userMenus的时候，都把useMenus映射到routes里
      // 1. userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // 2. 将routes => router.main.children
      // addRoute()动态添加路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      const permissions = mapMenusToPermissions(userMenus)

      state.permissions = permissions
    }
  },
  actions: {
    // context上：下文对象，payload：传过来的参数
    async accountLoginAction(context, payload: IAccount) {
      // 1. 实现登录逻辑
      // 拿到的是promise，这里用async await，写异步函数
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      context.commit('changeToken', token)
      localCache.setCache('token', token)

      // 发送初始化请求（完整的role/完整的department）
      context.dispatch('getInitialDataAction', null, { root: true }) // 调用根里的’getInitialDataAction‘action

      // 2.请求用户信息
      const userInfoResult = await requestUsrInfoById(id)
      const userInfo = userInfoResult.data
      context.commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      context.commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4. 跳到首页
      router.push('/main')
    },

    // 刷新操作
    laodLocalLogin(context) {
      const token = localCache.getCache('token')
      if (token) {
        context.commit('changeToken', token)
        // 发送初始化请求（完整的role/完整的department）
        context.dispatch('getInitialDataAction', null, { root: true }) // 调用根里的’getInitialDataAction‘action
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        context.commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userInfo) {
        context.commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModuel

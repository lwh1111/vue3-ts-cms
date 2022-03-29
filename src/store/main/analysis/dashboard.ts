import { Module } from 'vuex'
import type { IDashboardState } from './type'
import type { IRootState } from '../../types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAdressGoodsSale
} from '@/service/main/dashboard/dashboard'

const dashboardMolule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, payload: any) {
      state.categoryGoodsCount = payload
    },
    changeCategoryGoodsSale(state, payload: any) {
      state.categoryGoodsSale = payload
    },
    changeCategoryGoodsFavor(state, payload: any) {
      state.categoryGoodsFavor = payload
    },
    changeAddressGoodsSale(state, payload: any) {
      state.addressGoodsSale = payload
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      const categoryGoodsFavorResult = await getCategoryGoodsFavor()
      const adressGoodsSaleResult = await getAdressGoodsSale()

      commit('changeCategoryGoodsCount', categoryGoodsCountResult.data)
      commit('changeCategoryGoodsSale', categoryGoodsSaleResult.data)
      commit('changeCategoryGoodsFavor', categoryGoodsFavorResult.data)
      commit('changeAddressGoodsSale', adressGoodsSaleResult.data)
    }
  }
}

export default dashboardMolule

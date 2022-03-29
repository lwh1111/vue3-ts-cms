<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <wh-card title="各类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </wh-card>
      </el-col>
      <el-col :span="10">
        <wh-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </wh-card>
      </el-col>
      <el-col :span="7">
        <wh-card title="各类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </wh-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <wh-card title="各类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </wh-card>
      </el-col>
      <el-col :span="12">
        <wh-card title="各类商品收藏量">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </wh-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import WhCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    WhCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')

    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLables: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLables.push(item.name)
        values.push(item.goodsCount)
      }

      return { xLables, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLables: string[] = []
      const values: any[] = []

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLables.push(item.name)
        values.push(item.goodsFavor)
      }

      return { xLables, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  padding-top: 20px;
}
</style>

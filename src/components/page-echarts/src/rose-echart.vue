<template>
  <div class="pie-echart">
    <wh-echart :options="options"></wh-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import WhEchart from '@/base-ui/echart'
import { IDataType } from '../types'

const props = defineProps<{
  roseData: IDataType[]
}>()

const options = computed(() => {
  return {
    // legend: {
    //   orient: 'horizontal'
    // },
    tooltip: {
      trigger: 'item'
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: ['6%', '60%'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>

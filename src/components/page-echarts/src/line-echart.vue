<template>
  <div class="pie-echart">
    <wh-echart :options="options"></wh-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import WhEchart from '@/base-ui/echart'

const props = defineProps<{
  xLables: string[]
  values: any[]
}>()

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    // legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLables
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '销量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.values
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>

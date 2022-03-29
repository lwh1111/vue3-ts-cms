<template>
  <div class="pie-echart">
    <wh-echart :options="options"></wh-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import WhEchart from '@/base-ui/echart'
import { IDataType } from '../types'

import { convertData } from '../utils/convert-data'

const props = defineProps<{
  mapData: IDataType[]
}>()

const options = computed(() => {
  return {
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      }
    },
    visualMap: {
      min: 0,
      max: 70000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: '#303133'
      }
    },
    // ⭐地理编码，把数据绘制到地图上对应的位置
    geo: {
      map: 'china',
      roam: 'scale',
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#f4cccc',
          borderColor: 'rgb(9, 54, 95)'
        },
        emphasis: {
          areaColor: '#f4cccc'
        }
      }
    },
    series: [
      {
        name: '销量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
    // dataset: {source: mapdata}
  }
})
</script>

<style lang="scss" scoped></style>

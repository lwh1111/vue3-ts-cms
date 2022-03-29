const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // transpileDependencies: true
  // 配置方式一：CLI提供的属性
  outputDir: './build',
  // publicPath: './', // 修改加载资源对应的路径
  // 配置方式二：和webpack属性完全一致，最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components' // 默认情况下webpack下配置了alias别名 @对应src
  //     }
  //   }
  // }
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: { '^/api': '' }, // 重写路径
        changeOrigin: true //本地会虚拟一个服务器接收你的请求并代你发送该请求
      }
    }
  }
})

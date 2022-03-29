import { createApp } from 'vue'
import App from './App.vue'
import { globalRegister } from './global' // 引入全局配置
import 'normalize.css'
import './assets/css/index.less'
import 'element-plus/theme-chalk/el-loading.css'

// element-plus 国际化配置
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import router from './router' // index.ts可以省略不写
import store from './store'
import { setupStore } from './store'
import { key } from './store/types'

const app = createApp(App)

globalRegister(app)
app.use(store, key) // 注册store, 传入 injection key
setupStore() // 每次刷新页面都会重新初始化store
app.use(router) // 注册路由 app.use(router) -> install(){} -> 获取当前path -> router.routes -> not found
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')

import { App } from 'vue'
// import 'element-plus/theme-chalk/el-loading.css'

// import {
//   ElButton,
//   ElTabs,
//   ElTabPane,
//   ElForm,
//   ElFormItem,
//   ElInput
// } from 'element-plus'
import {
  Iphone,
  UserFilled,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  Delete,
  Edit,
  RefreshRight
} from '@element-plus/icons' // 引入图标

// const components = [ElButton, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput]
const icons = [
  Iphone,
  UserFilled,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  Delete,
  Edit,
  RefreshRight
]

// export function elComponents(app: App): void {
//   // 全局注册组件 app.component(组件名, {组件内容})
//   for (const component of components) {
//     app.component(component.name, component)
//   }
// }

export function elIcons(app: App): void {
  // 全局注册组件 app.component(组件名, {组件内容})
  for (const icon of icons) {
    app.component(icon.name, icon)
  }
}

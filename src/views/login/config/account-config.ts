// 编写表单验证规则
export const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur' // 失去焦点时触发
    },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: '用户名必须是5~10位的字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur' // 失去焦点时触发
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}

import { IForm } from '@/base-ui/form/types'

export const modalConfig: IForm = {
  labelWidth: '80px',
  itemStyle: { padding: '10px 10px' },
  formItems: [
    {
      field: 'name',
      type: 'input',
      lable: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      lable: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      lable: '密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      lable: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      lable: '选择部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      lable: '选择角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  calLayout: { span: 24 }
}

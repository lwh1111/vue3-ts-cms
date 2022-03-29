import { IForm } from '@/base-ui/form/types'

export const searchFormConfig: IForm = {
  labelWidth: '80px',
  formItems: [
    {
      field: 'id',
      type: 'input',
      lable: 'id',
      placeholder: '请输入id'
    },
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
      field: 'cellPhone',
      type: 'input',
      lable: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      lable: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { title: '启用', value: '1' },
        { title: '禁用', value: '0' }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      lable: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}

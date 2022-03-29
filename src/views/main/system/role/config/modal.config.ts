import { IForm } from '@/base-ui/form/types'

export const modalConfig: IForm = {
  labelWidth: '80px',
  itemStyle: { padding: '10px 10px' },
  formItems: [
    {
      field: 'name',
      type: 'input',
      lable: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      lable: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  calLayout: { span: 24 }
}

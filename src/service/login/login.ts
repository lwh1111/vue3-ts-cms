import whRequest from '../index'
import { IAccount, ILoginResultData } from './types'
import { IDataType } from '../types'

// 枚举类型(typescript特有)，防止以后url修改
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return whRequest.post<IDataType<ILoginResultData>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUsrInfoById(id: number) {
  return whRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return whRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}

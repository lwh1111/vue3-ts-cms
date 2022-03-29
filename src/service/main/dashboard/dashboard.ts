import whRequest from '@/service/index'

// 枚举
enum DashBoardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return whRequest.get({
    url: DashBoardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return whRequest.get({
    url: DashBoardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return whRequest.get({
    url: DashBoardAPI.categoryGoodsFavor
  })
}

export function getAdressGoodsSale() {
  return whRequest.get({
    url: DashBoardAPI.addressGoodsSale
  })
}

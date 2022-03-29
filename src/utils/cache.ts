class localCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value)) // localStorage.setItem要求传入的必须为字符串,把value的值统一转换为JSON字符串
  }

  getCache(key: string) {
    // 把字符串转为对象
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new localCache()

class LocalCache {
  //保存数据
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  //得到数据
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  //删除某哥数据
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  //清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}
export default new LocalCache()

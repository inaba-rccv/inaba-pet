import Store from 'electron-store'

interface AppStore {}

export const appStore = new Store<AppStore>()

export const setStore = (key: string, value: any) => {
  appStore.set(key, value)
}

export const getStore = (key: string) => {
  return appStore.get(key)
}
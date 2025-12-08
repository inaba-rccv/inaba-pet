// @ts-expect-error
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data)
  },
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data)
  },

  on: (channel, callback) => {
    const handler = (_event, ...args) => callback(args[0])
    ipcRenderer.on(channel, handler);
  },

  once(channel, listener) {
    const wrapped = (_event, data) => {
      listener(data)
    }
    ipcRenderer.once(channel, wrapped)
  },

  off: (channel, callback) => {
    // 在实际生产中，你可能需要一个更健壮的机制来移除特定的监听器。
    ipcRenderer.removeListener(channel, callback)
  }
})
// @ts-expect-error
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data)
  },
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data)
  },

  on: (channel, listener) => {
    // const handler = (_event, ...args) => callback(args[0])
    // ipcRenderer.on(channel, handler);
    ipcRenderer.on(channel, listener)
    return () => ipcRenderer.removeListener(channel, listener)
  },

  once(channel, listener) {
    const wrapped = (_event, data) => {
      listener(data)
    }
    ipcRenderer.once(channel, wrapped)
  },

  removeListener: (channel, listener) => {
    ipcRenderer.removeListener(channel, listener)
  }
})
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
    // IpcRendererEvent 作为第一个参数，我们只将业务数据传递给渲染进程的回调
    const handler = (event, ...args) => callback(args[0])
    ipcRenderer.on(channel, handler);
  },

  off: (channel, callback) => {
    // 注意：由于 on 方法包装了 handler，这里的 off 只是示例，
    // 在实际生产中，你可能需要一个更健壮的机制来移除特定的监听器。
    ipcRenderer.removeListener(channel, callback)
  }
})
// TODO 改为TS + 构建

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendMove: (data) => ipcRenderer.send('move-window', data),
  onMessage: (callback) => ipcRenderer.on('message', callback)
})
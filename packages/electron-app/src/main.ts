import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'
import { registerIPC } from './ipc/index.ts';

const isDev = !!process.env.VITE_DEV_SERVER_URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    // width: 500,
    // height: 760,
    width: 320,
    height: 240,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    // resizable: false,
    skipTaskbar: true,
    webPreferences: {
      // nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload', 'index.js'),
    }
  })
  win.setIgnoreMouseEvents(false, { forward: true })
  
  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL!)
    // win.webContents.openDevTools()
  } else {
    const rendererPath = path.join(process.resourcesPath, 'renderer/index.html')
    win.loadFile(rendererPath)
    // win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  registerIPC()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

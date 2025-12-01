import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';

const isDev = !!process.env.VITE_DEV_SERVER_URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    // width: 50,
    // height: 76,
    width: 130,
    height: 120,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    // resizable: false,
    skipTaskbar: true,
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: false
      contextIsolation: true,
      preload: path.join(__dirname, 'modules', 'preload', 'index.js'),
    }
  })

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL!)
    // win.webContents.openDevTools()
    // win.loadFile('./assets/dist/index.html')
  } else {
    win.loadFile('./assets/dist/index.html')
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('move-window', (event, { dx, dy }) => {
  const mainWindow = BrowserWindow.fromWebContents(event.sender);

  // 1. 获取当前窗口位置
  const [currentX, currentY] = mainWindow!.getPosition();

  // 2. 计算新位置
  const newX = currentX + dx;
  const newY = currentY + dy;

  // 3. 设置新位置
  mainWindow!.setPosition(newX, newY);
});
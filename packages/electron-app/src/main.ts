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
  win.setIgnoreMouseEvents(true, { forward: true })

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

const windowWatchMap: Map<Electron.BrowserWindow, Function> = new Map()

ipcMain.on('move-window', (event, { dx, dy }) => {
  const mainWindow = BrowserWindow.fromWebContents(event.sender);
  const [currentX, currentY] = mainWindow!.getPosition();
  const newX = currentX + dx;
  const newY = currentY + dy;
  mainWindow!.setPosition(newX, newY);
})

ipcMain.on('mouse-ignore', (event, { state }) => {
  const mainWindow = BrowserWindow.fromWebContents(event.sender);
  mainWindow?.setIgnoreMouseEvents(state, { forward: true })
})

ipcMain.on('message', (event, callback) => {
  const mainWindow = BrowserWindow.fromWebContents(event.sender);
  mainWindow && windowWatchMap.set(mainWindow, callback)
})

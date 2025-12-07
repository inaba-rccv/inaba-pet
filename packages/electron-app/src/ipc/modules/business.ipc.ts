import { BrowserWindow, ipcMain } from 'electron'
import { registerIpc } from './factory.ts'

export const registerBusinessIPC = () => {
  registerIpc('move-window', (event, { dx, dy }) => {
    const mainWindow = BrowserWindow.fromWebContents(event.sender)
    const [currentX, currentY] = mainWindow!.getPosition()
    const newX = currentX + dx
    const newY = currentY + dy
    mainWindow!.setPosition(newX, newY)
  })

  registerIpc('mouse-ignore', (event, { state }) => {
    const mainWindow = BrowserWindow.fromWebContents(event.sender)
    mainWindow?.setIgnoreMouseEvents(state, { forward: true })
  })
}

import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
    new BrowserWindow().loadURL('http://127.0.0.1:3000')
})

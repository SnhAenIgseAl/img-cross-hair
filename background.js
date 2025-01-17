const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// 屏蔽安全警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'



const createWindow = () => {
    const win = new BrowserWindow({
        icon: path.join(__dirname, 'public/vite.svg'),
        width: 960,
        height: 540,
        minWidth: 960,
        minHeight: 540,
        frame: false,
        // autoHideMenuBar: true,
        backgroundColor: '#ffffff',
        transparent: true,
        resizable: true,
        hasShadow: true,
        
        movable: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            // enableRemoteModule: true,
            // preload: path.join(__dirname, 'preload.js')
        }
    })

    if(process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
        // 开启调试台
        win.webContents.openDevTools()
    } else {
        win.loadFile(join(__dirname, 'dist/index.html'))
    }

    // 更改窗口样式
    ipcMain.handle('change-window-style', () => {
        // win.setFullScreen(true)
        win.setAlwaysOnTop(true)
        win.setBackgroundColor('rgba(0, 0, 0, 0)')
        win.setIgnoreMouseEvents(true)
    })

    // 还原窗口样式
    ipcMain.handle('restore-window-style', () => {
        // win.setFullScreen(false)
        win.setAlwaysOnTop(false)
        win.setBackgroundColor('#ffffff')
        win.setIgnoreMouseEvents(false)
    })

    // 窗口居中
    ipcMain.handle('window-center', () => {
        win.center()
    })

    // 全屏
    ipcMain.handle('window-fullscreen', () => {
        win.setFullScreen(true)
    })

    // 退出全屏 | 重置大小
    ipcMain.handle('window-un-fullscreen', () => {
        win.setSize(960, 540, true)
        win.center()
    })

    // 窗口关闭
    ipcMain.handle('window-closed', () => {
        win.close()
    })
}



app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
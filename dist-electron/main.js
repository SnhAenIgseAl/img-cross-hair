"use strict";
const electron = require("electron");
electron.app.whenReady().then(() => {
  new electron.BrowserWindow().loadURL("http://127.0.0.1:3000");
});

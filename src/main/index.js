import { app, BrowserWindow, ipcMain, dialog } from 'electron' // eslint-disable-line
import fs from 'fs';
import path from 'path';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 870,
    useContentSize: true,
    width: 1024,
    webPreferences: {
      webSecurity: false,
    },
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('select-folder', (event) => {
  const result = dialog.showOpenDialog({
    properties: ['openDirectory', 'multiSelections'], /* 'openFile', 'multiSelections'], */
    // filters: [
    //   { name: 'Photos', extensions: ['jpg', 'png'] },
    // ],
  });

  if (typeof result === 'object') {
    const p = result[0];
    fs.readdir(p, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      const fileList = [];

      files.map(file => path.join(p, file)).filter(
        file => fs.statSync(file).isFile(),
      ).forEach(
        file => fileList.push({
          id: path.basename(file, path.extname(file)), src: file, selected: false, deleted: false,
        }),
      );

      event.returnValue = fileList;
    });
  } else {
    event.returnValue = [];
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

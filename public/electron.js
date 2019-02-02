const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const https = require('https');
const fs = require('fs');
const Jimp = require('jimp');


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  console.log('first check');
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
    console.log('second check');
  }
});

ipcMain.on('message', (event, arg) => {
  
  let textData = {
    text: arg.topText, 
    maxWidth: 1004, 
    maxHeight: 72+20, 
    placementX: 10, 
    placementY: 1024-(72+20)-10 
  };

  Jimp.read(arg.url)
    .then(image => {
      Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
        .then(font => ([image, font]))
    })
    .then(data => {
      tpl = data[0];
      font = data[1];    
      
      return tpl.print(font, textData.placementX, textData.placementY, {
        text: textData.text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      }, textData.maxWidth, textData.maxHeight);
    })
    .then(tpl => (tpl.quality(100).write('imgExported.png')))	
})
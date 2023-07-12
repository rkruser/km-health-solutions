/*
Based on tutorial from: https://www.electronjs.org/docs/latest/tutorial/quick-start

Other good tutorials for using with React:
https://mmazzarolo.com/blog/2021-08-12-building-an-electron-application-using-create-react-app/


*/

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  mainWindow.loadURL('http://localhost:3000');

  ipcMain.on('myEvent', (event, arg) => {
    console.log(arg);  // prints "Hello, main process!"
    event.reply('myEventResponse', 'Hello, renderer process!');
  });
}

app.whenReady().then(createWindow);


// Notes as of Tuesday 7/11: this only works if electron is run separately after react. Need to fix.
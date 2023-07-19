/*
Based on tutorial from: https://www.electronjs.org/docs/latest/tutorial/quick-start

Other good tutorials for using with React:
https://mmazzarolo.com/blog/2021-08-12-building-an-electron-application-using-create-react-app/

*/

// ==========================================================
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('node:url'); //important!

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
    
  });

  // Hypothesis: the relative directories in the built app follow the structure of your package.json build files fields. If you use the default '**/*' then it probably puts all files in one flat directory
  
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "./build/index.html"),
        protocol: "file",
        slashes: true,
        })
    : url.format({
        protocol: 'http',
        hostname: 'localhost',
        port: 3000
        });


  mainWindow.loadURL(appURL);
  //mainWindow.loadFile('./build/index.html');

  
  ipcMain.on('myEvent', (event, arg) => {
    console.log(arg);  // prints "Hello, main process!"
    event.reply('myEventResponse', 'Hello, renderer process!');
  });
}

app.whenReady().then(createWindow);

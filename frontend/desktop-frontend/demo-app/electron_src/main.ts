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
        pathname: path.join(__dirname, "../build/index.html"),
        protocol: "file",
        slashes: true,
        })
    : url.format({
        protocol: 'http',
        hostname: 'localhost',
        port: 3000
        });


  mainWindow.loadURL(appURL);

  mainWindow.on('ready-to-show', () => {
    mainWindow.webContents.send('displayMessage', "Hello, this is the main process speaking");
  });
}



ipcMain.on('myEvent', (event, arg:any) => {
  console.log(arg);
  event.reply('myEventResponse', 'Main received: ' + arg.toString());
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Add the Apple if statement here or whatever later
/*
Based on tutorial from: https://www.electronjs.org/docs/latest/tutorial/quick-start

Other good tutorials for using with React:
https://mmazzarolo.com/blog/2021-08-12-building-an-electron-application-using-create-react-app/


*/

const {app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
    });
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      });

      app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
      }); 
})
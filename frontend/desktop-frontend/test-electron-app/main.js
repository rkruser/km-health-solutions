/*
Based on tutorial from: https://www.electronjs.org/docs/latest/tutorial/quick-start

Other good tutorials for using with React:
https://mmazzarolo.com/blog/2021-08-12-building-an-electron-application-using-create-react-app/


*/

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
      width: 800, height: 1000,
      webPreferences: { nodeIntegration: true }
  });

  const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:3000';

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', function () {
      mainWindow = null
  });
}


app.on('ready', createWindow);



// Notes as of Tuesday 7/11: this only works if electron is run separately after react. Need to fix.
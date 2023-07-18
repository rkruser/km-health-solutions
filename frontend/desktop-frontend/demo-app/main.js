/*
Based on tutorial from: https://www.electronjs.org/docs/latest/tutorial/quick-start

Other good tutorials for using with React:
https://mmazzarolo.com/blog/2021-08-12-building-an-electron-application-using-create-react-app/


*/


/*
OKAY SO: THE PROJECT WON'T COMPILE UNLESS THERE IS PUBLIC/ELECTRON.JS BUT THE EXECUTABLE WON'T RUN UNLESS THERE IS MAIN.JS IN THE PROJECT ROOT. ???


*/



// ==========================================================
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('node:url'); //important!

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
    /*
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
    */
  });

  
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "./build/index.html"),
        protocol: "file:",
        slashes: true,
        })
    : url.format({
      pathname: path.join(__dirname, "./build/index.html"), // "../build/index.html"
      protocol: "file:",
      slashes: true,
      }); //http://localhost:3000


  /*
  const appURL = app.isPackaged ? "https://www.reddit.com/" : "https://www.wikipedia.com";
  console.log(app.isPackaged);
  console.log(appURL);
  */
  console.log(appURL);
  mainWindow.loadURL(appURL);

  console.log("test");

  // This line works, above doesn't
  //mainWindow.loadFile('./build/index.html');

  
  ipcMain.on('myEvent', (event, arg) => {
    console.log(arg);  // prints "Hello, main process!"
    event.reply('myEventResponse', 'Hello, renderer process!');
  });
}

// Could just add createWindow directly, but was testing out the alternative
app.whenReady().then(createWindow);
// ===================================================







/*
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


  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "./build/index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";


  mainWindow.loadURL(appURL);

 // mainWindow.loadFile('./build/index.html');

  
  ipcMain.on('myEvent', (event, arg) => {
    console.log(arg);  // prints "Hello, main process!"
    event.reply('myEventResponse', 'Hello, renderer process!');
  });
  
}

// Could just add createWindow directly, but was testing out the alternative
app.whenReady().then(createWindow);
*/
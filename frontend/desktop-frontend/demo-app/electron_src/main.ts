/*
Based on tutorial from: https://www.electronjs.org/docs/latest/tutorial/quick-start

Other good tutorials for using with React:
https://mmazzarolo.com/blog/2021-08-12-building-an-electron-application-using-create-react-app/

*/

// ==========================================================
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('node:url'); //important!


const {generateFakePatientsAndWriteToFile} = require('./main_filesystem_io');
const {readJSONFromFile} = require('./main_filesystem_io');

async function readAndWrite() {
  console.log("Writing");
  await generateFakePatientsAndWriteToFile(20, './assets/patients.json');
  try{ 
    console.log("Reading");
    await readJSONFromFile('./assets/patients.json').then((patients:Array<any>) => {
      console.log(patients);
      console.log(typeof(patients[0]));
      console.log(patients[0].patientInfo.firstName);
    }).then(() => {
      process.exit(0);
    });
  }
  catch (error) {
    console.error(`Error while reading data from file: ${error}`);
    process.exit(1);
  }
}

readAndWrite();


const {completeText} = require('./completion');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    
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

ipcMain.on('completeTextRequest', async (event, arg:any) => {
  console.log("Got: "+arg);
  let result = await completeText(arg.toString());
  console.log("ChatGPT response: " + result);
  event.reply('completeTextResponse', result);
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
// eventHandlers.js
const setEventHandlers = (ipcMain, patientData, completeText, api) => {
    ipcMain.on('requestAllPatientData', (event, arg) => {
      console.log("Got request for patient data");
      event.reply('allPatientDataResponse', patientData);
    });
  
    ipcMain.on('myEvent', (event, arg) => {
      console.log(arg);
      event.reply('myEventResponse', 'Main received: ' + arg.toString());
    });
  
    ipcMain.on('completeTextRequest', async (event, arg) => {
      console.log("Got: " + arg);
      let result = await completeText(arg.toString());
      console.log("ChatGPT response: " + result);
      event.reply('completeTextResponse', result);
    });
    
    ipcMain.on('apiRequest', async (event, ...args) => {
      console.log("Got request for api: " + args);
      let apiFunctionName = args[0];
      let apiFunctionArgs = args.slice(1);
      let apiFunction = api[apiFunctionName];
      if (apiFunction) {
        let result = await apiFunction(...apiFunctionArgs);
        console.log("API response: " + result);
        event.reply('apiRequestResponse', result);
      }
      else {
        console.log("API function not found");
      }
    });
  };
  
export {setEventHandlers};
  
// eventHandlers.js
const setEventHandlers = (ipcMain, patientData, completeText) => {
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
  };
  
export {setEventHandlers};
  
const { contextBridge, ipcRenderer } = require('electron');

/*



*/

const validSendChannels = [
  'apiRequest',
  'requestAllPatientData',
  'myEvent',
  'completeTextRequest',

  'getPatientList', 
  'getSearchResults', 
  'getCurrentPatientId',
  'getPatientAggregateInfo',
  'getOverallSummary',
  'getOrderSummary',
  'getMedicationSummary',
  'getBasicInfo',
  'setCurrentPatientId',
  'setCurrentPatientAggregateInfo',
  'setSearchState'
];
const validReceiveChannels = validSendChannels.map((channel) => channel + 'Response');

contextBridge.exposeInMainWorld(
  'electron', {
    send: (channel:string, ...args:any[]) => {
      if (validSendChannels.includes(channel)) {
        console.log("Sending message \""+args?.toString()+"\" to channel: " + channel);
        ipcRenderer.send(channel, ...args);
      }
    },
    on_receive: (channel:string, func:(event:any, ...args:any[])=>void) => {
      if (validReceiveChannels.includes(channel)) {
        console.log("Adding listener for channel: " + channel);
        ipcRenderer.on(channel, func);
      }
    },
    remove_listener: (channel:string) => {
      console.log("Removing listener for channel: " + channel);
      ipcRenderer.removeAllListeners(channel); // removeListener doesn't work, this does
    }
  }
);

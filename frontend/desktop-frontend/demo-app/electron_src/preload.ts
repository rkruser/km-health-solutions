const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'electron', {
    send: (channel:string, arg:any) => {
      let validChannels = ['myEvent'];
      if (validChannels.includes(channel)) {
        console.log("Sending message to channel: " + channel);
        ipcRenderer.send(channel, arg);
      }
    },
    on_receive: (channel:string, func:(event:any,arg:any)=>void) => {
      let validChannels = ['myEventResponse'];
      if (validChannels.includes(channel)) {
        console.log("Adding listener for channel: " + channel);
        ipcRenderer.on(channel, func);
      }
    },
    remove_listener: (channel:string, func:(event:any,arg:any)=>void) => {
      let validChannels = ['myEventResponse'];
      if (validChannels.includes(channel)) {
        console.log("Removing listener for channel: " + channel);
        ipcRenderer.removeListener(channel, func);
      }
    }
  }
);

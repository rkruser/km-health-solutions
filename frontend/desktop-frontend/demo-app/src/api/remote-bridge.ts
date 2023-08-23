/*
Provide an interface for reading and writing files / database entries

If this react app is being run within electron, then this will be a bridge to the electron main process.
Otherwise, this will be a bridge to a server.
If neither of these is available, a dummy interface will be provided.
*/

declare global {
    interface Window {
      electron:any;
    }
}

const remote = {
    bridge: window.electron //Provided by electron in preload.js, if one exists
    // Extend to remote.api when I write API functionality?
}


// Being stricter about typing here might be more secure
// Update this interface with more precise functions
if (!remote.bridge) {
    console.log("Electron functionality is not available, using dummy interface");
    remote.bridge = {
        send: (channel:string, ...args:any[]) => {
            console.log(`Electron functionality "${channel}" with message "${args}" is not available`);
          },        
        on_receive: (channel:string, func: (event:any, ...args:any[])=>void) => {
            console.log(`Electron functionality "${channel}" is not available`);
          },
        remove_listener: (channel:string) => {
            console.log(`Electron functionality "${channel}" is not available`);
        }
    }
}

export default remote;
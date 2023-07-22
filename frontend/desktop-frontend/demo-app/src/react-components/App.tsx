import React, { useState, useEffect, useRef } from 'react';
import '../css/app.css';
import { completeText } from '../api/completion';
// consider using the styled-components library for wrapper objects that style their contents

declare global {
  interface Window {
    electron:any;
  }
}

// Define dummy electron object with placeholders for development without Electron
if (!window.electron) {
  window.electron = {
    receive: (channel:string, func: (arg:any)=>void) => {
      console.log(`Electron functionality "${channel}" is not available`);
    },
    send: (channel:string, message:any) => {
      console.log(`Electron functionality "${channel}" with message "${message}" is not available`);
    },
  };
}

function App() {
  
  return (
    <div>
      <p>Hello, I am app entity</p>
    </div>
  );
}

export default App;


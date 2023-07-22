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
  const [inputText, setInputText] = useState('Input Text Default');
  const [displayText, setDisplayText] = useState('Initial display text');

  async function handleButton(command:string) {
    setDisplayText(command);      
    const result = await completeText(inputText);
    setDisplayText(result);
  }

  return (
    <div className='App'>
      <textarea
        value={inputText}
        onChange={(e)=>setInputText(e.target.value)}
      />
      <div>{displayText}</div>
      <div>
        <button onClick={()=>{handleButton("loadPatient")}}>Load Patient</button>
        <button onClick={()=>{handleButton("summarizeNotes")}}>Summarize Notes</button>
        <button onClick={()=>{handleButton("checkOrders")}}>Check Orders</button>
        <button onClick={()=>{handleButton("getRecommendations")}}>Get Recommendations</button>
      </div>
    </div>
  );
}

export default App;


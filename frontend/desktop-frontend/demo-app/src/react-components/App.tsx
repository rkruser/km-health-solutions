import '../css/app.css';
import SearchContext from './search-context';
import PatientContext from './patient-context';
import PatientOverview from './patient-overview';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { completeText } from '../api/completion';
import SearchBar from './search-bar';
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
  const [selectedSearchValue, setSelectedSearchValue] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Record<string,any>>({"summary": "summary text", "orders": "orders text"});

  async function handleButton(command:string) {
    setDisplayText(command);      
    const result = await completeText(inputText);
    setDisplayText(result);
  }

  useEffect(() => {
    setSelectedPatient( currentPatient => ({...currentPatient, "summary": selectedSearchValue}) );
  }, 
  [selectedSearchValue]
  );

  return (
    <div className='App'>
      <SearchContext.Provider 
        value={{selectedSearchValue, setSelectedSearchValue}}
      >
        <p>{selectedSearchValue}</p>
        <SearchBar />
        <textarea
          value={inputText}
          onChange={(e)=>setInputText(e.target.value)}
        />
        <div>{displayText}</div>
        <PatientContext.Provider value={{selectedPatient, setSelectedPatient}}>
          <PatientOverview />
        </PatientContext.Provider>
        <div>
          <button onClick={()=>{handleButton("loadPatient")}}>Load Patient</button>
          <button onClick={()=>{handleButton("summarizeNotes")}}>Summarize Notes</button>
          <button onClick={()=>{handleButton("checkOrders")}}>Check Orders</button>
          <button onClick={()=>{handleButton("getRecommendations")}}>Get Recommendations</button>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;


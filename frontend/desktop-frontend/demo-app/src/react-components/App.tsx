import '../css/app.css';
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

/*
TODO:
- Move the electron code below to a separate file
- Write a function that invokes chatGPT to generate fake patients for testing
- Add various react modules, including: Header interface (wrapping search bar), display components for the different data categories, chat components, and medical database search/verification components
- Make everything prettier and maximally intuitive
- Design your API more thoroughly now that the interface is giving you a better idea
- **Write test cases for every function!!**
- Integrate FHIR query ability!
- {Backend: local database, local background helper process to coordinate with server, server entry point, server database, server AI interface, server AI bridge to chatGPT and others, server bridge to FHIR}







*/



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

const testPatient = {
  "info": "Patient name and stuff",
  "summary": "summary text",
  "orders": "orders text",
  "medications": "medications text",
  "timeline": "timeline text",
  "history": "history text",
  "labs": "labs text",
  "vitals": "vitals text",
  "notes": "notes text",
  "recommendations": "recommendations text",
  "diagnoses": "diagnoses text",
  "allergies": "allergies text",
}

function App() {
  const [inputText, setInputText] = useState('Input Text Default');
  const [displayText, setDisplayText] = useState('Initial display text');
  const [selectedSearchValue, setSelectedSearchValue] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Record<string,any>>(testPatient);

  async function handleButton(command:string) {
    setDisplayText(command);      
    const result = await completeText(inputText);
    setDisplayText(result);
  }

  useEffect(() => {
    setSelectedPatient( currentPatient => ({...currentPatient, "summary": selectedSearchValue, "orders":selectedSearchValue+"dfasdf", "recommendations":selectedSearchValue+"skarskarskarskar"}) );
  },
  [selectedSearchValue]
  );

  return (
    <div className='App'>
        <PatientContext.Provider 
        value={{selectedPatient, setSelectedPatient,
          selectedSearchValue, setSelectedSearchValue}}
        >
          <SearchBar />
          <p>{selectedSearchValue}</p>
          <PatientOverview />

      </PatientContext.Provider>


    </div>
  );
}

export default App;

/*
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


*/
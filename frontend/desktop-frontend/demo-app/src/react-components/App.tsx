import '../css/app.css';
import PatientContext from './patient-context';
import PatientOverview from './patient-overview';
import remote from './remote-bridge';
import { getTestPatient, getRandomInteger } from './utility';

import { completeText } from '../api/completion';
import SearchBar from './search-bar';
import AppHeader from './app-header';

import React, { useState, useContext, useEffect, useRef } from 'react';
// consider using the styled-components library for wrapper objects that style their contents


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


function App() {
  const [inputText, setInputText] = useState('Input Text Default');
  const [displayText, setDisplayText] = useState('Initial display text');
  const [selectedSearchValue, setSelectedSearchValue] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Record<string,any>>(getTestPatient());

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

  /*
  // Testing out sends and receives to main process 
  useEffect(() => {
    const responseFunc = (event:any, arg:any) => {
      console.log("Renderer received: " + arg.toString());
      setDisplayText(arg.toString());
    };
    remote.bridge.on_receive('myEventResponse', responseFunc);
    return () => {
      remote.bridge.remove_listener('myEventResponse', responseFunc);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      remote.bridge.send('myEvent', getRandomInteger(0,100).toString());
    }, 2000);
    console.log("Added periodic callback!");
    // The cleanup function returned by useEffect
    // will clear the interval when the component unmounts
    return () => {
      console.log('Clearing periodic callback!');
      clearInterval(intervalId);
    };
  }, []); 
  */

  return (
    <div className='App'>
        <p>{displayText}</p>
        <PatientContext.Provider 
        value={{selectedPatient, setSelectedPatient,
          selectedSearchValue, setSelectedSearchValue}}
        >
          <AppHeader />
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
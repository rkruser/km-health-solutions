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
- Write a function that invokes chatGPT to generate fake patients for testing
- Add various react modules, including: Header interface (wrapping search bar), display components for the different data categories, chat components, and medical database search/verification components
- Make everything prettier and maximally intuitive
- Design your API more thoroughly now that the interface is giving you a better idea
- **Write test cases for every function!!**
- Integrate FHIR query ability!
- {Backend: local database, local background helper process to coordinate with server, server entry point, server database, server AI interface, server AI bridge to chatGPT and others, server bridge to FHIR}


Next thing to do: fake patient generation so I can actually begin to format the interface

DESIGN:
- Check boxes to show/hide each data category
- Check boxes/radio buttons to modify summaries if desired
- Buttons to go into further details about things
- Chat interface under each data category, and also general chat interface
- Quick action buttons
- Automatic linking of data to relevant medical databases
- Further data on the right?

*/


function App() {
  const [inputText, setInputText] = useState('Input Text Default');
  const [displayText, setDisplayText] = useState('Initial display text');
  const [selectedSearchValue, setSelectedSearchValue] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Record<string,any>>(getTestPatient());
  const [allPatientData, setAllPatientData] = useState<Array<any>>([]);

  function handleButton(command:string) {
    setDisplayText(command);      
    remote.bridge.send('completeTextRequest', inputText);
  }

  useEffect(() => {
    setSelectedPatient( currentPatient => ({...currentPatient, "summary": selectedSearchValue, "orders":selectedSearchValue+"dfasdf", "recommendations":selectedSearchValue+"skarskarskarskar"}) );
  },
  [selectedSearchValue]
  );


  useEffect(() => {
    const completeTextResponse = (event:any, arg:any) => {
      console.log("Channel \"completeTextResponse\", renderer received: " + arg.toString());
      setDisplayText(arg.toString());
    };
    remote.bridge.on_receive('completeTextResponse', completeTextResponse);
    return () => {
      remote.bridge.remove_listener('completeTextResponse', completeTextResponse);
    }
  }, []);

  useEffect(() => {
    const handleAllPatientDataResponse = (event:any, arg:any) => {
      setAllPatientData(arg);
    };
    remote.bridge.on_receive('allPatientDataResponse', handleAllPatientDataResponse);
    return () => {
      remote.bridge.remove_listener('handleAllPatientDataResponse', handleAllPatientDataResponse);
    }
  }, []);

  useEffect(() => {
    remote.bridge.send('requestAllPatientData', null);
  }
  , []);


  return (
    <div className='App'>
        <PatientContext.Provider 
        value={{selectedPatient, setSelectedPatient,
          selectedSearchValue, setSelectedSearchValue}}
        >
          <AppHeader />
          <p>{selectedSearchValue}</p>
          <PatientOverview />

      </PatientContext.Provider>

      <div>
        {JSON.stringify(allPatientData, null, 2)}
      </div>

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






      <textarea
          value={inputText}
          onChange={(e)=>setInputText(e.target.value)}
        />
      <div>{displayText}</div>
      <button onClick={()=>{handleButton("completeText")}}>Send query to main process</button>

  */
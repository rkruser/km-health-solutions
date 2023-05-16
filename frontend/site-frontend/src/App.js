import './App.css';

import React, { useState } from 'react';
import {Helmet} from 'react-helmet';


function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Demo medical app</title>
      </Helmet>
      <div className="site-banner">
        <h1 className="site-title">Demo Medical App</h1>
      </div>
      <div>
        <PatientInput />
      </div>
      <div style={{height: "40px"}}>
      </div>
    </div>
  );
}

export default App;


function generateData(text) {
  return text+" hello"
}


function PatientInput() {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    setDisplayText(generateData(inputText));
  };

  return (
    <div className="PatientInput">
      <div className="input-pane">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          className="text-entry"
        />
        <button onClick={handleSubmit} className="generate-button">
          Generate
        </button>
      </div>
      <div className="display-pane">
        <p>{displayText}</p>
      </div>
    </div>
  );
}







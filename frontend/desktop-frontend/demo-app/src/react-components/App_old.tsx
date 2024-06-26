import React, { useState, useEffect, useRef } from 'react';
import '../css/App_old.css';
import { completeText } from '../api/completion';

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
  const [clickCount, setClickCount] = useState(0);
  
  useEffect(() => {
    window.electron.receive('myEventResponse', (data:string) => {
      console.log(data); // prints "Hello, renderer process!"
    });
  }, []);

  useEffect(() => {
    window.electron.receive('displayMessage', (message:string) => {
      const displayWindow = document.getElementById("main_process_message_display");
      if (displayWindow !== null) {
        displayWindow.innerHTML = message;
      }
    });
  }, []);

  const handleClick = () => {
    window.electron.send('myEvent', 'Hello, main process lel! Clicks: ' + String(clickCount));
    setClickCount(clickCount+1);
  };

  return (
    <div className="App">
      <p id="main_process_message_display">Hello, pre-text with eee</p>
      <button onClick={handleClick}>Send message to main process</button>
      <p>Post text</p>
      <div>
        <TwoColumnLayout />
      </div>
    </div>    
  );
}

export default App;


function callCompleteText(prompt:string) {
  return completeText(prompt);
}

function TwoColumnLayout() {
  let patientExampleText = "John Doe is a 64-year-old male who is recovering from heart surgery in the ICU.";  
  const [inputText, setInputText] = useState(patientExampleText);
  const [generatedText, setGeneratedText] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [isLoading, setIsLoading] = useState({ generate: false, summarize: false });
  const [customText, setCustomText] = useState('');

  const handleGenerate = () => {
    let generatePrePrompt = "Given the following description of a hypothetical medical patient, generate a realistic and detailed set of hourly nurse's notes, including vital signs, for that patient spanning 48 hours of a hospital stay (unless otherwise specified). Patient description:\n\n";

    setIsLoading({ ...isLoading, generate: true });
    callCompleteText(generatePrePrompt+inputText).then((completion) => {
      setGeneratedText(completion);
      setIsLoading({ ...isLoading, generate: false });
    });
  };

  const handleSummarize = () => {
    let summarizePrePrompt = "Given the following set of nurse's notes, write a compact and succint summary of the major medically relevant events described therein. Notes:\n\n";

    setIsLoading({ ...isLoading, summarize: true });
    callCompleteText(summarizePrePrompt+generatedText).then((completion) => {
      setSummarizedText(completion);
      setIsLoading({ ...isLoading, summarize: false });
    });
  };

  const handleCustom = () => {
    let customPrompt = "Answer the following prompt about the nurse's notes for a patient as best you can:\n\n Prompt: ";
    let customPrompt2 = "\n\nNurse's notes:\n";

    setIsLoading({ ...isLoading, summarize: true });
    callCompleteText(customPrompt+customText+customPrompt2+generatedText).then((completion) => {
      setSummarizedText(completion);
      setIsLoading({ ...isLoading, summarize: false });
    });
  };

  return (
    <div className="two-column-layout">
      <div className="left-column">
        <textarea
          className="input-area"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text here..."
        />
        <button className="generate-btn" onClick={handleGenerate}>
          Generate Patient Notes
        </button>
        <div className="generated-text">
          {isLoading.generate ? <div><div className="loader"></div><p>Querying chatGPT... this may take up to a few minutes</p></div> : generatedText}
        </div>
      </div>
      <div className="right-column">
        <div id="spacerdiv">
          <p>Instructions</p>
          <ol>
            <li>Edit the text in the box to the left to describe a fictional patient.</li>
            <li>Click the "Generate notes" button to generate an example set of nurse's notes for the given patient. If you would like the notes formatted in a certain manner, you may ask the model to do this in natural language in the text input box, though this is not required.</li>
            <li>Once the notes have loaded, click the "Summarize" button to generate a brief summary of the notes.</li>
            <li>If you would like to ask a custom question about the notes, use the Custom Query button after writing your question in the adjacent text area.</li>
          </ol>
        </div>
        <button className="summarize-btn" onClick={handleSummarize}>
          Summarize Patient Notes
        </button>

        <div id="custom-div">
          <button id="custom-btn" onClick={handleCustom}>Custom Query</button>
          <input id="custom-input"
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Were there any medical complications?"
          />
        </div>

        <div className="summarized-text">
          {isLoading.summarize ? <div><div className="loader"></div><p>Querying chatGPT... this may take up to a few minutes</p></div> : summarizedText}
        </div>
      </div>
    </div>
  );
}
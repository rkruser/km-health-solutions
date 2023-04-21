import React, { useState } from 'react';
import './App.css';
const { completeText } = require('./completion').default;

function App() {
  return (
    <div className="App">
      <div className="site-banner">
        <h1 className="site-title">Demo Medical App</h1>
      </div>
      <div>
        <TwoColumnLayout />
      </div>
    </div>
  );
}

export default App;

// ****************** GPT-4 Code (with some modifications) *******************


function TwoColumnLayout() {
  let patientExampleText = "John Doe is a 64-year-old male who is recovering from heart surgery in the ICU.";  
  const [inputText, setInputText] = useState(patientExampleText);
  const [generatedText, setGeneratedText] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [isLoading, setIsLoading] = useState({ generate: false, summarize: false });

  const handleGenerate = () => {
    let generatePrePrompt = "Given the following description of a hypothetical medical patient, generate a realistic and detailed set of hourly nurse's notes, including vital signs, for that patient spanning 48 hours of a hospital stay. Patient description:\n\n";

    setIsLoading({ ...isLoading, generate: true });
    completeText(generatePrePrompt+inputText).then((completion) => {
      setGeneratedText(completion);
      setIsLoading({ ...isLoading, generate: false });
    });
  };

  const handleSummarize = () => {
    let summarizePrePrompt = "Given the following set of nurse's notes, write a compact and succint summary of the major medically relevant events described therein. Notes:\n\n";

    setIsLoading({ ...isLoading, summarize: true });
    completeText(summarizePrePrompt+generatedText).then((completion) => {
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
          {isLoading.generate ? <div><div className="loader"></div><p>Querying chatGPT... this may take a moment</p></div> : generatedText}
        </div>
      </div>
      <div className="right-column">
        <div id="spacerdiv">
          <p>Instructions</p>
          <ol>
            <li>Edit the text in the box to the left to describe a fictional patient.</li>
            <li>Click the "Generate notes" button to generate an example set of nurse's notes for the given patient.</li>
            <li>Once the notes have loaded, click the "Summarize" button to generate a brief summary of the notes.</li>
          </ol>
        </div>
        <button className="summarize-btn" onClick={handleSummarize}>
          Summarize Patient Notes
        </button>
        <div className="summarized-text">
          {isLoading.summarize ? <div><div className="loader"></div><p>Querying chatGPT... this may take a moment</p></div> : summarizedText}
        </div>
      </div>
    </div>
  );
}






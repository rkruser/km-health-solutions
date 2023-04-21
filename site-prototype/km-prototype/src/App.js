import React, { useState } from 'react';
import './App.css';
const { completeText } = require('./completion').default;

function App() {
  return (
    <div className="App">
      <div class="site-banner">
        <h1 class="site-title">Demo Medical App</h1>
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
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [isLoading, setIsLoading] = useState({ generate: false, summarize: false });

  const handleGenerate = () => {
    setIsLoading({ ...isLoading, generate: true });
    completeText(inputText).then((completion) => {
      setGeneratedText(completion);
      setIsLoading({ ...isLoading, generate: false });
    });
  };

  const handleSummarize = () => {
    setIsLoading({ ...isLoading, summarize: true });
    completeText(generatedText).then((completion) => {
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
          Generate
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
          Summarize
        </button>
        <div className="summarized-text">
          {isLoading.summarize ? <div><div className="loader"></div><p>Querying chatGPT... this may take a moment</p></div> : summarizedText}
        </div>
      </div>
    </div>
  );
}






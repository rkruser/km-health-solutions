import React, { useState } from 'react';
import './App.css';
const { completeText } = require('./completion').default;

function App() {
  return (
    <div className="App">
      <header>
      </header>
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

  const handleGenerate = () => {
    completeText(inputText).then((completion) => {
      setGeneratedText(completion);
    });
  };

  const handleSummarize = () => {
    completeText(generatedText).then((completion) => {
      setSummarizedText(completion);
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
        <div className="generated-text">{generatedText}</div>
      </div>
      <div className="right-column">
        <div style={{ height: '213px' }}></div>
        <button className="summarize-btn" onClick={handleSummarize}>
          Summarize
        </button>
        <div className="summarized-text">{summarizedText}</div>
      </div>
    </div>
  );
}






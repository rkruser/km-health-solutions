import React, { useState } from 'react';
import './App.css';
const { completeText } = require('./completion').default;

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <div>
        <DoubleInputArea />
      </div>
    </div>
  );
}

export default App;

// ****************** GPT-4 Code (with some modifications) *******************
function DoubleInputArea() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [response1, setResponse1] = useState('');
  const [response2, setResponse2] = useState('');

  const handleSubmit1 = () => {
    console.log('Submit1:', input1);

    completeText(input1)
      .then((completion) => {
        console.log('Completion:', completion);
        setResponse1(completion);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit2 = () => {
    console.log('Submit2:', input2);

    let pre_prompt = "You are a chatbot proxy for someone named Ryen Krusinga. Sign off all your responses with --Ryen K.\n\n";

    completeText(pre_prompt + input2)
      .then((completion) => {
        console.log('Completion:', completion);
        setResponse2(completion);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <div className="text-input-container">
        <textarea
          className="text-input"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter text here..."
        />
        <button className="submit-btn" onClick={handleSubmit1}>
          Submit
        </button>
        <div className="response">
          {response1}
        </div>
      </div>
      <div className="text-input-container">
        <textarea
          className="text-input"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Enter text here..."
        />
        <button className="submit-btn" onClick={handleSubmit2}>
          Submit
        </button>
        <div className="response">
          {response2}
        </div>
      </div>
    </div>
  );
}






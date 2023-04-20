import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <body>
        <DoubleInputArea />
      </body>
    </div>
  );
}

export default App;

// ****************** GPT-4 Code (with some modifications) *******************
function DoubleInputArea() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleSubmit1 = () => {
    // Add your custom logic here
    console.log('Submit1:', input1);
  };

  const handleSubmit2 = () => {
    // Add your custom logic here
    console.log('Submit2:', input2);
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
      </div>
    </div>
  );
};






import './App.css';

import React, { useState, useRef, useEffect } from 'react';
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
        <AIchat />
      </div>
      <div style={{height: "40px"}}>
      </div>
    </div>
  );
}

export default App;


function generateData(text) {
  return text.toUpperCase() + " hello";
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

function chatWithAI(text) {
  return "placeholder text!!"
}

function performAction(action) {
  return "placeholder text! 2222"
}

function AIchat() {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    const reply = await chatWithAI(inputText);
    addMessageToChat(`User: ${inputText}`);
    addMessageToChat(`AI: ${reply}`);
    setInputText('');
  };

  const addMessageToChat = (message) => {
    setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
  };

  const handleButtonClick = async (action) => {
    const result = await performAction(action);
    addMessageToChat(`AI: ${result}`);
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  return (
    <div className="AIchat">
      <div className="left-column">
        <button onClick={() => handleButtonClick('summarize')}>Summarize</button>
        <button onClick={() => handleButtonClick('keywords')}>Keywords</button>
        <button onClick={() => handleButtonClick('format as')}>Format As</button>
      </div>
      <div className="chat-container">
        <div className="chat-window" ref={chatWindowRef}>
          {chatHistory.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}






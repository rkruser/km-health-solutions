import './App.css';

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

/*
React helmet says there are security errors, and react-helmet-async will not compile
import { Helmet } from 'react-helmet-async';
  <Helmet>
  <title>Demo medical app</title>
  </Helmet>   
*/

function App() {
  return (
    <div className="App">   
      <div className="site-banner">
        <h1 className="site-title">Demo Medical App</h1>
      </div>
      <div className="site-body">
        <SharedProvider>
          <PatientInput />
          <AIchat />
        </SharedProvider>
      </div>
      <div style={{height: "40px"}}>
      </div>
    </div>
  );
}

export default App;


/*
async function generateData(prompt) {
  try {
    // Need to find a better way to switch between local and production fetch urls. Separate servers?
    // https://localhost:3000/complete-text
    const response = await fetch('http://localhost:3000/generate-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Error completing text');
    }

    const data = await response.json();
    console.log(data);
    return data.completion;
  } catch (error) {
    console.error('Error completing text:', error);
    return 'Error: could not access chatGPT';
  }
}
*/

async function generateData(prompt) {
  return prompt + " This is a test"
}


const SharedContext = createContext();

function SharedProvider({ children }) {
  const [generatorInputText, setGeneratorInputText] = useState('');
  const [chatInputText, setChatInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const value = {
    generatorInputText,
    setGeneratorInputText,
    chatInputText,
    setChatInputText,
    displayText,
    setDisplayText,
    chatHistory,
    setChatHistory,
  };

  return <SharedContext.Provider value={value}>{children}</SharedContext.Provider>;
}

function useShared() {
  return useContext(SharedContext);
}



function PatientInput() {
  const {generatorInputText, setGeneratorInputText, displayText, setDisplayText } = useShared();

  const handleInputChange = (event) => {
    setGeneratorInputText(event.target.value);
  };

  const handleSubmit = () => {
    // setDisplayText(generateData(inputText));
    generateData(generatorInputText).then((completion) => {
      setDisplayText(completion);
    });
  };

  return (
    <div className="PatientInput">
      <div className="input-pane">
        <textarea
          value={generatorInputText}
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
  const {chatInputText, setChatInputText, chatHistory, setChatHistory, displayText, setDisplayText} = useShared();

  const chatWindowRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleInputChange = (event) => {
    setChatInputText(event.target.value);
  };

  const handleSubmit = async () => {
    const reply = await chatWithAI(chatInputText);
    addMessageToChat(`User: ${chatInputText}`);
    addMessageToChat(`AI: ${reply}`);
    setChatInputText('');
  };

  const addMessageToChat = (message) => {
    setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
  };

  const handleButtonClick = async (action) => {
    if (action == 'summarize') {
      console.log("Summarizing!");
      addMessageToChat(`AI: ${displayText}`);
    }
    else {
      console.log(action);
      const result = await performAction(action);
      addMessageToChat(`AI: ${result}`);
    }
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
            value={chatInputText}
            onChange={handleInputChange}
            placeholder="Custom query..."
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}






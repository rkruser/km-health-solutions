import './App.css';

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

/*
React helmet says there are security errors, and react-helmet-async will not compile
import { Helmet } from 'react-helmet-async';
  <Helmet>
  <title>Demo medical app</title>
  </Helmet>   
*/


/*
Next steps:
1. Improve the API logic
2. Add button to generate random patient in addition to generating notes
3. Add button functionality to AIChat
4. Add ability to click on keywords if possible
5. Make interface prettier
6. Put back on web with https for Vivek to see

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

/*
Makes a POST request to the API on the server which takes a command and a dictionary of arguments
*/
async function queryAPI(command, argument_dict) {
  try {
    const response = await fetch('http://localhost:3000/api-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command, argument_dict }),
    });

    if (!response.ok) {
      throw new Error('Error completing text');
    }

    const data = await response.json();
    console.log(data);
    return data.query_result;
  } catch (error) {
    console.error('Error completing text:', error);
    return 'Error: could not access the API';
  }
}


/*
async function generateData(prompt) {
  return prompt + " This is a test"
}
*/


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
  const [isLoading, setIsLoading] = useState(false);  

  const handleInputChange = (event) => {
    setGeneratorInputText(event.target.value);
  };

  const handleSubmit = () => {
    // setDisplayText(generateData(inputText));
    setIsLoading(true);
    queryAPI('generate-notes', {'patient_description':generatorInputText}).then((notes) => {
      setIsLoading(false);
      setDisplayText(notes);
    });
  };

  return (
    <div className="PatientInput">
      <div className='left-input-column'></div>
      <div className='patient-input-container'>
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
          {isLoading ? <div className='patient-input-loader'></div> : <p>{displayText}</p>}
        </div>
      </div>
    </div>
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function chatWithAI(text) {
  await sleep(2000);
  return "sleep? placeholder text!!";
}

function performAction(action) {
  return "placeholder text! 2222";
}

function AIchat() {
  const {chatInputText, setChatInputText, chatHistory, setChatHistory, displayText} = useShared();
  const [isLoading, setIsLoading] = useState(false);

  const chatWindowRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleInputChange = (event) => {
    setChatInputText(event.target.value);
  };

  const handleSubmit = () => {
    addMessageToChat(`User: ${chatInputText}`);
    setIsLoading(true);
    chatWithAI(chatInputText).then( (reply) => {
      setIsLoading(false);
      addMessageToChat(`AI: ${reply}`);
      setChatInputText('');
    });
  };

  const handleKeyDown = async (e) => {
    if (e.code === 'Enter') {
      handleSubmit();
    }
  };

  const addMessageToChat = (message) => {
    setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
  };

  const handleButtonClick = async (action) => {
    setIsLoading(true);
    queryAPI(action, {'patient_data': displayText}).then( (query_result) => {
      setIsLoading(false);
      addMessageToChat(`AI: ${query_result}`);
    });
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  return (
    <div className="AIchat">
      <div className="left-column">
        <button onClick={() => handleButtonClick('summarize-notes')}>Summarize</button>
        <button onClick={() => handleButtonClick('extract-keywords')}>Keywords</button>
        <button onClick={() => handleButtonClick('organize-notes')}>Organize</button>
      </div>
      <div className="chat-container">
        <div className="chat-window" ref={chatWindowRef}>
          {chatHistory.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
            {isLoading ? <div className='chat-loader'></div> : <div></div>}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={chatInputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Custom query..."
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}






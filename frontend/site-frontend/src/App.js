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
1. Improve the API logic (done)
2. Add button to generate random patient in addition to generating notes (done)
3. Add button functionality to AIChat (done)
4. Add ability to click on keywords if possible
5. Make interface prettier (largely done)
6. Put back on web with https for Vivek to see

*/

// window.location.href should return either http://localhost:3000 or https://ryenandvivekstartup.online/
//   depending on deployment.
//  Is this safe? I don't see why not.
const API_FETCH_LOCATION = window.location.href + 'api-query';
console.log(API_FETCH_LOCATION);

function App() {
  return (
    <div className="App">   
      <div className="site-banner">
        <div className='site-logo'></div>
        <h1 className="site-title">Demo Medical App</h1>
      </div>
      <div className="site-body">
        <div className='instructions'>
          <h2>Instructions</h2>
          <ol>
            <li>Generate a random patient</li>
            <li>Generate notes for the patient</li>
            <li>Use the chat window to get information about the patient. The buttons on the left are convenient shortcuts for summarizing different aspects of patient data. You can also ask custom questions in the 'custom query' input bar on the bottom.</li>
          </ol>
          <p>
            Note: this site is a work in progress, and some things might not work well. Best viewed on a laptop or desktop computer. Don't chat too long before reloading the page, since there might be errors right now when the chat history gets too long.
          </p>
        </div>
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
Makes a POST request to the API on the server which takes a command and a dictionary of arguments
*/
async function queryAPI(command, argument_dict) {
  try {
    const response = await fetch(API_FETCH_LOCATION, {
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
  const [patientIsLoading, setPatientIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setGeneratorInputText(event.target.value);
  };

  const handleRandomPatientSubmit = () => {
    setPatientIsLoading(true);
    queryAPI('generate-patient', {}).then((patient_description) => {
      setPatientIsLoading(false);
      setGeneratorInputText(patient_description);
    })
  }

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
            value={patientIsLoading ? "Generating patient..." : generatorInputText}
            onChange={handleInputChange}
            className="text-entry"
          />
          <div className='patient-button-container'>
            <button onClick={handleRandomPatientSubmit} className="generate-button">
              Random Patient
            </button>
            <button onClick={handleSubmit} className="generate-button">
              Generate Notes
            </button>
          </div>
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

function removeLastElement(list) {
  if (list.length > 0) {
    list.pop();
  }
  return list;
}

function AIchat() {
  const {generatorInputText, chatInputText, setChatInputText, chatHistory, setChatHistory, displayText} = useShared();
  const [isLoading, setIsLoading] = useState(false);

  const chatWindowRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleInputChange = (event) => {
    setChatInputText(event.target.value);
  };

  const handleSubmit = () => {
    addMessageToChat('user', chatInputText);
    setIsLoading(true);
    addMessageToChat('assistant','');
    queryAPI('chat-with-ai', {'patient_description':generatorInputText, 'patient_data':displayText, 'message_history':chatHistory, 'user_chat':chatInputText}).then( (reply) => {
      setLastChatMessage(reply);
      setIsLoading(false);
      setChatInputText('');
    });
  };

  const handleKeyDown = async (e) => {
    if (e.code === 'Enter') {
      handleSubmit();
    }
  };

  const addMessageToChat = (role, message) => {
    setChatHistory((prevChatHistory) => [...prevChatHistory, {'role':role, 'content':message}]);
  };

  const removeMessageFromChat = () => {
    setChatHistory((prevChatHistory) => removeLastElement(prevChatHistory));
  };
  
  const setLastChatMessage = (content) => {
    setChatHistory((prevChatHistory) => {
      const newChatHistory = [...prevChatHistory];
      newChatHistory[newChatHistory.length - 1].content = content;
      return newChatHistory;
    });
  };

  /*Not good if generatorInputText is modified, but works for now*/
  const handleButtonClick = async (action) => {
    addMessageToChat('user', '/'+action)
    setIsLoading(true);
    addMessageToChat('assistant','');
    queryAPI(action, {'patient_description':generatorInputText, 'patient_data':displayText}).then( (query_result) => {
      setLastChatMessage(query_result);
      setIsLoading(false);
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
        <button onClick={() => handleButtonClick('list-medications')}>Medications</button>
      </div>
      <div className="chat-container">
        <div className="chat-window" ref={chatWindowRef}>
            {chatHistory.map((message, index) => (
              <ChatEntry key={index} role={message.role}>
                { isLoading&&(index===chatHistory.length-1) ? <div className='chat-loader'></div> : message.content}
              </ChatEntry>
            ))}
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

function ChatEntry({role, children}) {
  const textClass = role === 'assistant' ? 'chat-entry-ai' : 'chat-entry-user';

  return (
    <div className={textClass}>
      <div className='chat-role'>
        <strong>{role}:</strong>
      </div>
      <div className='chat-entry-content'>
        {children}
      </div>
    </div>
  );
}





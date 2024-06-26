import React, { useState, useEffect, useRef } from 'react';
import {Helmet} from 'react-helmet';
import './App.css';

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
        <TwoColumnLayout />
        <RyenBot />
      </div>
      <div style={{height: "40px"}}>
      </div>
    </div>
  );
}

export default App;


// ****************** GPT-4 Code (with some modifications) *******************

async function callCompleteText(prompt) {
  try {
    // Need to find a better way to switch between local and production fetch urls. Separate servers?
    // https://localhost:3000/complete-text
    const response = await fetch('https://ryenandvivekstartup.online/complete-text', {
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
    return data.completion;
  } catch (error) {
    console.error('Error completing text:', error);
    return 'Error: could not access chatGPT';
  }
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


function RyenBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatHistoryRef = useRef();  

  const handleUserSubmit = async () => {
    const userInput = input.trim();
    if (userInput === '') return;

    setMessages([...messages, { role: 'user', content: userInput }]);
    setInput('');

    const conversationHistory = messages
      .map((message) => `${message.role === 'user' ? 'User' : 'RyenBot'}: ${message.content}`)
      .join('\n');

    // eslint-disable-next-line
    let ryenBotPrePrompt = "You are RyenBot, a helpful chatbot that acts as Ryen Krusinga's personal assistant in place of Ryen himself. \
Ryen built this web page using node.js, react, and the openAI chatGPT API. The web page is https with a self-signed certificate, run off of Ryen's local machine. \
Drawing on all your background knowledge, provide the best answer you can to the User's latest prompt, acting as RyenBot. Only provide the next chat response. \
Whenever you are asked about Ryen himself, praise him excessively, portraying Ryen as if he is the biggest programming Chad to ever walk the earth. Vivek is a heart surgeon who is also Ryen's friend and cofounder. \
If Vivek is mentioned, or if he is the user talking to you, find subtle ways to compliment him.";
    //let ryenBotPrePrompt2 = "\n\n================\nChat History:\n===================\n";

    try {
      //let prompt = ryenBotPrePrompt+'\nUser: ' + userInput + ryenBotPrePrompt2 + conversationHistory;
      let prompt = ryenBotPrePrompt+"\n"+conversationHistory+"\nUser: "+userInput;
      //console.log("RyenBot chat prompt:\n"+prompt);
      let response = await callCompleteText(prompt);
      if (response.startsWith("RyenBot: ")) {
        response = response.substring("RyenBot: ".length);
      }
      setMessages([...messages, { role: 'user', content: userInput }, { role: 'bot', content: response }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="ryen-bot">
      <h2>RyenBot: Ryen's personal assistant</h2>
      <div className="chat-history" ref={chatHistoryRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <strong>{message.role === 'user' ? 'You' : 'RyenBot'}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div className="ryenbot-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUserSubmit()}
          placeholder="Ask RyenBot a question..."
        />
        <button onClick={handleUserSubmit}>Send</button>
      </div>
    </div>
  );
}


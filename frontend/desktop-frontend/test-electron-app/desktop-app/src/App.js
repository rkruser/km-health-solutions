import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.electron.receive('myEventResponse', (data) => {
      console.log(data); // prints "Hello, renderer process!"
    });
  }, []);

  const handleClick = () => {
    window.electron.send('myEvent', 'Hello, main process!');
  };

  return (
    <div className="App">
      <p>Hello, pre-text</p>
      <button onClick={handleClick}>Send message to main process</button>
      <p>Post text</p>
    </div>
  );
}

export default App;

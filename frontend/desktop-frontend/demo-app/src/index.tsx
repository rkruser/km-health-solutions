import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './react-components/App';
// import reportWebVitals from './reportWebVitals';

import RendererAPIService from './api/ampere-api';

const api = new RendererAPIService();
console.log(api.getOrderSummary('', ''));

const root = ReactDOM.createRoot(
  document.getElementById('AppRoot') as HTMLElement
  );
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

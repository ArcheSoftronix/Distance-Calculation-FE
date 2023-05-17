import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* browserRouter from react-router-dom */}
    <BrowserRouter>
      {/* warp whole app */}
      <App />
      {/* close whole app */}
    </BrowserRouter>
    {/* close browserRouter from react-router-dom */}
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="google clientID">

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
    document.getElementById('root')
);


reportWebVitals();

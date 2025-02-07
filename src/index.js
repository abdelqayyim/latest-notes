import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppProvider from './redux/AppProvider';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Spinner from './components/Spinner/Spinner';
const root = ReactDOM.createRoot(document.getElementById('root'));
const CLIENT_ID = "1001964400350-lggblnjng7dv1i7m7npkkrjid94ia36g.apps.googleusercontent.com"
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AppProvider>
        <Spinner/>
        <App />
      </AppProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

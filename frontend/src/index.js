import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ForumpostContextProvider } from './context/ForumpostContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ForumpostContextProvider>
        <App />
      </ForumpostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


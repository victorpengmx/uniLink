import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ForumpostContextProvider } from './context/ForumpostContext';
import { FPCommentContextProvider } from './context/FPCommentContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ForumpostContextProvider>
        <FPCommentContextProvider>
          <App />
        </FPCommentContextProvider>
      </ForumpostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


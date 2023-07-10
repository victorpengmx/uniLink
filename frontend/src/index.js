import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ForumpostContextProvider } from './context/ForumpostContext';
import { FPCommentContextProvider } from './context/FPCommentContext';
import { AuthContextProvider } from './context/AuthContext';
import { EventContextProvider } from './context/EventContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ForumpostContextProvider>
        <FPCommentContextProvider>
          <EventContextProvider>
            <App />
          </EventContextProvider>
        </FPCommentContextProvider>
      </ForumpostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


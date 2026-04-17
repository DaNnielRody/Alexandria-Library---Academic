import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ClerkProvider } from '@clerk/react-router';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder'}
      >
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
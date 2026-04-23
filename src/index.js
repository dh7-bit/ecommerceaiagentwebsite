import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'
import { Provider } from 'react-redux';
import { store } from './Store';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Setup } from './Setuprouter';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="941060693182-2p08411gqoupi9rjevdagu6ggcj5thlp.apps.googleusercontent.com">
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Setup />
      </QueryClientProvider>
    </Provider>
  </GoogleOAuthProvider>
);

reportWebVitals();

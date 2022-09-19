import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteSwitch from './RouteSwitch';
import { AuthProvider } from './context/AuthProvider';
import { StyleProvider } from './context/StyleProvider';
import { ToastProvider } from './context/ToastProvider';
import './style/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StyleProvider>
        <ToastProvider>
          <RouteSwitch />
        </ToastProvider>
      </StyleProvider>
    </AuthProvider>
  </React.StrictMode>
);

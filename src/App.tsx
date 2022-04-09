import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ContextProvider } from './stores';

function App() {
  return (
    <ContextProvider>
    </ContextProvider>
  );
}

export default App;

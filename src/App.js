import React from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Pasos from './components/Pasos'

function App() {
  return (
    <div className="App">      
      <Navigation ime="Comi"/>
      <Pasos />
    </div>
  );
}

export default App;

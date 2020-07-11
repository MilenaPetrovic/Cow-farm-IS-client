import React from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Pasos from './components/Pasos'
import Otpremnica from './components/Otpremnica'

function App() {
  return (
    <div className="App">      
      <Navigation ime="Comi"/>
      {/* <Pasos /> */}
      <Otpremnica />
    </div>
  );
}

export default App;

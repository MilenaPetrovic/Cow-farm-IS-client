import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import Pasos from './components/Pasos'
import Otpremnica from './components/Otpremnica'
import Pocetna from './components/Pocetna'

function App() {
  return (
    <Router>
      <div className="App">      
        <Navigation ime="Comi"/>
        <Switch>
          <Route path="/" exact component={Pocetna}/>
          <Route path="/otpremnica" exact component={Otpremnica}/>
          <Route path="/pasos" exact component={Pasos}/>
        </Switch>
      </div>
    </Router>    
  );
}

export default App;

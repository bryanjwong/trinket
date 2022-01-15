import React, { useState } from "react";
import logo from './logo.svg';
import Navbar from './components/Navbar';
import './App.css';

function App() {

  // Use this to change current Page View State
  const [pageState, setPageState] = React.useState(0);
  const pages = ['Collection', 'Objectives', 'Map'];

  // Use pageState to render corresponding page
  function renderPage(pageId) {
    switch(pageId) {
      case 0:
        return (<p>Collection</p>);
      case 1:
        return (<p>Objectives</p>);
      case 2:
        return (<p>Map</p>);
    }
  }

  return (
    <div className="App">
      <Navbar 
        pages={pages}
        setPageState={setPageState}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {renderPage(pageState)}
      </header>
    </div>
  );
}

export default App;

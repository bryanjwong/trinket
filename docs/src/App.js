import React, { useState } from "react";
import Navbar from './components/Navbar';
import Collection from './components/Collection';
import Objectives from './components/Objectives';
import './App.css';

function App() {

  // Use this to change current Page View State
  const [pageState, setPageState] = React.useState(0);
  const pages = ['Collection', 'Objectives', 'Map'];

  // Use pageState to render corresponding page
  function renderPage(pageId) {
    switch(pageId) {
      case 0:
        return (<Collection/>);
      case 1:
        return (<Objectives/>);
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
        {renderPage(pageState)}
      </header>
    </div>
  );
}

export default App;

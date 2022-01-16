import React, { useEffect } from "react";
import Navbar from './components/Navbar';
import Collection from './components/Collection';
import Objectives from './components/Objectives';
import './App.css';
import { db } from "./services/Firebase"
import { ref, child, get, set } from "firebase/database";

function App() {

  // Use this to change current Page View State
  const [pageState, setPageState] = React.useState(0);
  const pages = ['Collection', 'Objectives', 'Map'];

  const [objectives, setObjectives] = React.useState([]);
  const [complObjectives, setComplObjectives] = React.useState([]);
  const [trinkets, setTrinkets] = React.useState({"0": {
      "name1": "?",
      "name2": "?",
      "name3": "?",
      "level": 1,
      "objText": "?",
      "totalSteps": 0,
      "totalDuration": 0,
      "totalTrips": 0
    }
  });
  const [activeId, setActiveId] = React.useState(0);

  function loadFirebaseData() {
    get(ref(db, "users/bwong/"))
      .then((snapshot) => {
        var data = snapshot.val();
        setObjectives(data.objectives)
        setComplObjectives(data.completed_objectives)
        var t = {};
        for (const [id, v] of Object.entries(data.trinkets)) {
          t[id] = v;
        }
        setTrinkets(t);
        setActiveId(data.consts.activeId);
        console.log(data);
        console.log(objectives);
        console.log(complObjectives);
        console.log(trinkets);
        console.log(activeId);
      })
  }

  // Swap active trinket to specified id
  function swapActiveId(id) {
    setActiveId(id);
    set(ref(db, 'users/bwong/consts/activeId'), id);
  }

  // Load all Firebase data on startup
  useEffect(() => {
    loadFirebaseData();
  }, []);
  
  // Use pageState to render corresponding page
  function renderPage(pageId) {
    switch(pageId) {
      case 0:
        return (<Collection trinkets={trinkets} activeId={activeId} swapActiveId={swapActiveId}/>);
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
      {renderPage(pageState)}
    </div>
  );
}

export default App;

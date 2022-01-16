import React, { useEffect } from "react";
import Navbar from './components/Navbar';
import Collection from './components/Collection';
import Objectives from './components/Objectives';
import About from './components/About';
import Map from './components/Map';
import { db } from "./services/Firebase"
import { ref, get, set } from "firebase/database";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
export const images = importAll(require.context('./images', true, /\.(png|jpe?g|svg|gif)$/));

function App() {

  // Use this to change current Page View State
  const [pageState, setPageState] = React.useState(0);
  const pages = ['Collection', 'Objectives', 'Map', 'About'];

  const [objectives, setObjectives] = React.useState({
    "obj1": { "name": "?" },
    "obj2": { "name": "?" },
    "obj3": { "name": "?" }
  });
  const [complObjectives, setComplObjectives] = React.useState([]);
  const [trinkets, setTrinkets] = React.useState({"0": {
      "name1": "?",
      "name2": "?",
      "name3": "?",
      "level": 1,
      "evolveLevel": 1,
      "speciesId": 0,
      "objText": "?",
      "totalSteps": 0,
      "totalDuration": 0,
      "totalTrips": 0
    }
  });
  const [activeId, setActiveId] = React.useState(0);
  const [markers, setMarkers] = React.useState([]);

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
        setMarkers(data.markers);
        console.log(data);
      })
  }

  function shuffleObjs() {
    fetch("https://us-central1-trinket-ideahacks.cloudfunctions.net/shuffleObjs")
    .then(window.location.reload(false));
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
        return (<Objectives objectives={objectives} complObjectives={complObjectives} shuffleObjs={shuffleObjs}/>);
      case 2:
        return (<Map isMarkerShown markers={markers} trinkets={trinkets}/>);
      case 3:
        return (<About/>);
    }
  }

  return (
    <div className="App">
      <Navbar 
        pages={pages}
        setPageState={setPageState}
        trinkets={trinkets}
        activeId={activeId}
      />
      {renderPage(pageState)}
    </div>
  );
}

export default App;

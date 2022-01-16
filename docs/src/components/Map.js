import React from "react";
import GoogleMapReact from 'google-map-react';
import pin from '../images/pin.png'

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../images', true, /\.(png|jpe?g|svg|gif)$/));

function Map(props) {
  const defaultProps = {
    center: {
      lat: 34.064172,
      lng:  -118.445275
    },
    zoom: 15
  };

  function generateMarkers() {
    var res = [];
    for (const [id, v] of Object.entries(props.markers)) {
      res.push(<img style={{height: "6vh"}} src={pin}
                lat={v.lat}
                lng={v.long}/>)
    }
    return res;
  }

  function generateTrinketMarkers() {
    var res = []
    for (const [id, v] of Object.entries(props.trinkets)) {
      if (v.lat && v.long) {
        console.log(v);
        var trinketImageSrc = images[v.speciesId+"_"+v.evolveLevel+".gif"];
        res.push(<img style={{height: "12vh", borderRadius: "50px"}} src={trinketImageSrc}
                  lat={v.lat}
                  lng={v.long}/>)
      }
    }
    return res;
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAy74BuO5ru15n9NQcVSGceBjPeU9rAHHg" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {generateMarkers()}
        {generateTrinketMarkers()}
      </GoogleMapReact>
    </div>
  );
}
export default Map;
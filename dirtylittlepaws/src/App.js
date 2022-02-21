import logo from "./logo.svg";
import "./App.css";
import React, { Component, PropTypes } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Handlebars from "handlebars/dist/cjs/handlebars";
import {
  MapLayout,
  MainLayout,
  PanelStyles,
  LocationName,
  AmenityName,
  AvailabilityTxt,
  PriceTxt,
  ScanButton,
  ScanButtonTxt,
  AmenitiesLayout,
  BottomNav,
} from "./styles/mapstyles";
import close from "../src/styles/svgs/close.svg";
import CurrentLocationIcon from "../src/styles/svgs/Location.svg";
import paws from "../src/styles/svgs/paws.png";
import Activepaws from "../src/styles/svgs/ActivePaws.png";
import { Panel, PanelGroup } from "rsuite";
import CurrentLocation from "./Map";
import { useData } from './utilities/firebase.js';

import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set, on } from 'firebase/database';
const google = window.google;

const firebaseConfig = {
  apiKey: "AIzaSyBAAAaqRWLP7A4BwEmCVC2OWoKXw8j79W4",
  authDomain: "dirtylittlepaws-487d9.firebaseapp.com",
  databaseURL: "https://dirtylittlepaws-487d9-default-rtdb.firebaseio.com",
  projectId: "dirtylittlepaws-487d9",
  storageBucket: "dirtylittlepaws-487d9.appspot.com",
  messagingSenderId: "781498327165",
  appId: "1:781498327165:web:9da20c4afa727b8e5e5114"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


/**
 * Defines an instance of the Locator+ solution, to be instantiated
 * when the Maps library is loaded.
 */
const mapStyles = {
  width: "428px",
  height: "934px",
};

const instance = (
  <Panel header="Panel title">
    <p>HELLO WORLD</p>
  </Panel>
);



// function MyFireBaseHook()
// {
//   return function WrappedComponent()
//     {
//       const [locations, loading, error] = useData('/Locations/'); 
//       if (error) return <h1>{error}</h1>;
//       if (loading) return <h1>Loading Locations...</h1>;
//       console.log(locations)
//       return <Component Location = {locations}/>;
//     };
// }

//Initializes the map and marker functionality
export class MapContainer extends Component {

  constructor(props)
  {
    super(props);
    
    this.state = {
      showingInfoWindow: false, // Hides or shows the InfoWindow
      activeMarker: {}, // Shows the active marker upon click
      selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
      icon:paws,
      LocationList :[]
    };
  }
  

 

  // GetData = () => {
  //   return function WrappedComponent()
  //   {
  //     const [locations, loading, error] = useData('/Locations/'); 
  //     if (error) return <h1>{error}</h1>;
  //     if (loading) return <h1>Loading Locations...</h1>;

  //     return locations;
  //   };
    
  // }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };


  componentDidMount()
  {
    
    const reference = ref(database, '/Locations/');

    onValue(reference, snapshot => {
      let locations = [];
      snapshot.forEach(snap => {
      
    // snap.val() is the dictionary with all your keys/values from the 'students-list' path
      locations.push(snap.val());
     
    });
   
    this.setState({LocationList:locations});
    });
  
  }

  

  render() {
    console.log(this.state.LocationList);
    return (
      //Renders the panel and the map <MyFireBaseHook/>
      
      

      <div id="outline">
      <center> <h1> Spot </h1> </center>

      <MainLayout id="main">
        
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          <Marker icon = {CurrentLocationIcon} onClick={this.onMarkerClick} name={"Current Location"} />
          {/* <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow> */}
          {Object.values(this.state.LocationList).map((marker) => (
            <Marker
              onClick={this.onMarkerClick}
              icon = {this.state.activeMarker === marker ? Activepaws : paws}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              key={marker.id}
              name={marker.name}
              availability="• Available"
              price="$3.30 unlock, $0.3 per min"
              title={marker.amenities}
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
          <BottomNav>
          </BottomNav>
        </CurrentLocation>
        {this.state.showingInfoWindow ? (
          <PanelStyles
          marker={this.state.activeMarker}

          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
            <img src={close} onClick = {() => this.setState({ showingInfoWindow: false, activeMarker: null,})} /> 
            <AvailabilityTxt>
              {this.state.selectedPlace.availability}
            </AvailabilityTxt>
            <LocationName>{this.state.selectedPlace.name}</LocationName>
            <PriceTxt>{this.state.selectedPlace.price}</PriceTxt>

            <AmenitiesLayout>
              <AmenityName>{this.state.selectedPlace.title}</AmenityName>
            </AmenitiesLayout>

            <center>
              <ScanButton>
                <ScanButtonTxt>Scan to unlock</ScanButtonTxt>
              </ScanButton>
            </center>
          </PanelStyles>
        ) : null}
        {/* Populating markers from marker list, allows for multiple markers */}
        {/* What shows up in the window on marker click */}
        
      </MainLayout>
      </div>
    );
  }
}

// API Keys
export default GoogleApiWrapper({
  apiKey: "AIzaSyAQoEnnmtQQ0bJ8fCvmKHPOI6VtNCXD6EY",
})(MapContainer);

//Run App (not using it rn - may need it later)
// function App() {

//   return (
//     //Renders the panel and the map
//      <div className="panel_map">
//        <Panel className="panel" header="Panel title">
//          <p>HELLO WORLD</p>
//         </Panel>

//       <div className="map">

//       {/* Map API initialization */}
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={
//           {
//             lat: 41.918060,
//             lng: -87.636990
//           }
//         }
//         >
//        {/* Populating markers from marker list, allows for multiple markers */}
//       {Object.values(markers).map(marker => (
//             <Marker
//               onClick={this.onMarkerClick}
//               position={{ lat: marker.latitude, lng: marker.longitude }}
//               key={marker.id}
//               name={marker.name}
//               title = {marker.amenities}
//             />
//         ))}
//         {/* What shows up in the window on marker click */}
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//           onClose={this.onClose}
//         >
//           <div>
//             <h4>{this.state.selectedPlace.name}</h4>
//             <h4>{this.state.selectedPlace.title}</h4>
//           </div>
//         </InfoWindow>
//       </Map>
//       </div>
//       </div>

//     );
// }

//export default App;

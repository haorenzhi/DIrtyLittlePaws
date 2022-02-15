import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Handlebars from "handlebars/dist/cjs/handlebars";
import { Panel, PanelGroup } from "rsuite";
const google = window.google;

/**
 * Defines an instance of the Locator+ solution, to be instantiated
 * when the Maps library is loaded.
 */
const mapStyles = {
  width: "500px",
  height: "500px",
};

const instance = (
  <Panel header="Panel title">
    <p>HELLO WORLD</p>
  </Panel>
);

const markers=[
  {
      id:1,
      latitude: 42.2730776, 
      longitude: -87.8721559,
      shelter:'marker 1'

  },
  {
      id: 2,
      latitude: 41.922230,
      longitude: -87.665672,
      shelter: 'marker 2'
  },
  {
    id: 3,
    latitude: 41.918060,
    longitude: -87.636990,
    shelter: 'marker 3'
}]

 export class MapContainer extends Component {

  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };

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




  render() {

    return (

     <div className="panel_map">
       <Panel className="panel" header="Panel title">
         <p>HELLO WORLD</p>
        </Panel>
      
      
      <div className="map">
      <Map
      
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 41.918060, 
            lng: -87.636990
          }
        }
        
        
      > 
      {Object.values(markers).map(marker => (
            <Marker
              onClick={this.onMarkerClick}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              key={marker.id}
              name={marker.shelter}
            />
        ))}
       <Marker
          onClick={this.onMarkerClick}
          name={'Ford Design Institute'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
      </div>
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAQoEnnmtQQ0bJ8fCvmKHPOI6VtNCXD6EY",
})(MapContainer);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

//export default App;

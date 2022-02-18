import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Handlebars from "handlebars/dist/cjs/handlebars";
import { MapLayout,
        MainLayout,
        PanelStyles,
        LocationName,
        AmenityName,
        AvailabilityTxt,
        PriceTxt,
        ScanButton,
        ScanButtonTxt,
        AmenitiesLayout,
        BottomNav
        } from "./styles/mapstyles";
import scanSVG from "../src/styles/svgs/scan.svg";
import { Panel, PanelGroup } from "rsuite";
import CurrentLocation from './Map';
const google = window.google;

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

//Array of positions for dog station locations with amenties and names 
const markers=[
  {
      id:1,
      latitude: 41.918060, 
      longitude: -87.636990,
      name:'marker 1',
      amenities: 'Washing, Drying, Pawicure, Grooming'

  },
  {
      id: 2,
      latitude: 41.922230,
      longitude: -87.665672,
      name: 'marker 2',
      amenities: 'Washing, Drying'
  },
  {
    id: 3,
    latitude: 41.9103558,
    longitude: -87.6735355,
    name: 'marker 3',
    amenities: 'Washing, Drying, Pawicure, Grooming'
  },
  {
    id: 4,
    latitude: 41.9174825,
    longitude: -87.6597932,
    name: 'marker 4',
    amenities: 'Washing, Drying, Grooming'
  },
  {
    id: 5,
    latitude: 41.9149889,
    longitude: -87.6645697,
    name: 'marker 5',
    amenities: 'Washing, Drying, Grooming'
  },
  {
    id: 6,
    latitude: 41.9010907,
    longitude: -87.6318406,
    name: 'marker 6',
    amenities: 'Washing, Drying'
  },
  {
    id: 7,
    latitude: 41.9320681,
    longitude: -87.6687625,
    name: 'marker 7',
    amenities: 'Washing, Drying, Pawicure, Grooming'
}]

//Initializes the map and marker functionality 
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



//Renders the app 
  render() {

    return (
      //Renders the panel and the map 
       <MainLayout>
         
        <MapLayout>
        
        {/* Map API initialization */}
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
          <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'Current Location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
         {/* Populating markers from marker list, allows for multiple markers */}
        {Object.values(markers).map(marker => (
              <Marker
                onClick={this.onMarkerClick}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                key={marker.id}
                name={marker.name}
                availability="• Available"
                price="$3.30 unlock, $0.3 per min"
                title = {marker.amenities}
              />
          ))}
          {/* What shows up in the window on marker click */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <h4>{this.state.selectedPlace.title}</h4>
            </div>
          </InfoWindow>
        </Map>
        </MapLayout>

        { this.state.showingInfoWindow ? 
         <PanelStyles>
            <AvailabilityTxt>{this.state.selectedPlace.availability}</AvailabilityTxt>
            <LocationName>{this.state.selectedPlace.name}</LocationName>
            <PriceTxt>{this.state.selectedPlace.price}</PriceTxt>

            <AmenitiesLayout>
                <AmenityName>{this.state.selectedPlace.title}</AmenityName>
            </AmenitiesLayout>
            
            <center><ScanButton>
              <ScanButtonTxt>Scan to unlock</ScanButtonTxt>
            </ScanButton></center>
          </PanelStyles>
          : null }

        <BottomNav></BottomNav>
        </MainLayout>
  
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

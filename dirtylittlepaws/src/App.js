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
const markers = [
  {
    id: 1,
    latitude: 41.91806,
    longitude: -87.63699,
    name: "1960 N Lincoln Park W",
    amenities: "Washing, Drying, Pawicure, Grooming",
  },
  {
    id: 2,
    latitude: 41.92223,
    longitude: -87.665672,
    name: "2228 N Clybourn Ave",
    amenities: "Washing, Drying",
  },
  {
    id: 3,
    latitude: 41.9103558,
    longitude: -87.6735355,
    name: "1825 W North Ave",
    amenities: "Washing, Drying, Pawicure, Grooming",
  },
  {
    id: 4,
    latitude: 41.9174825,
    longitude: -87.6597932,
    name: "2000 N Clybourn Ave",
    amenities: "Washing, Drying, Grooming",
  },
  {
    id: 5,
    latitude: 41.9149889,
    longitude: -87.6645697,
    name: "1765 N Elston Ave",
    amenities: "Washing, Drying, Grooming",
  },
  {
    id: 6,
    latitude: 41.9010907,
    longitude: -87.6318406,
    name: "Near North Side",
    amenities: "Washing, Drying",
  },
  {
    id: 7,
    latitude: 41.9320681,
    longitude: -87.6687625,
    name: "2750 N Ashland Ave",
    amenities: "Washing, Drying, Pawicure, Grooming",
  },
  {
    id: 8,
    latitude: 42.048100,
    longitude: -87.678291,
    name: "1715 Chicago Ave",
    amenities: "Washing, Drying, Pawicure, Grooming",
  },
  {
    id: 9,
    latitude: 42.056860,
    longitude: -87.676700,
    name: "2133 Sheridan Rd",
    amenities: "Washing, Drying, Pawicure, Grooming",
  },
  {
    id: 10,
    latitude: 42.051811,
    longitude: -87.685303,
    name: "1890 Maple Ave",
    amenities: "Washing, Drying, Pawicure, Grooming",
  },
  {
    id: 11,
    latitude: 42.053240,
    longitude: -87.687890,
    name: "1930 Ridge Ave",
    amenities: "Washing, Drying, Pawicure, Grooming",
  },
  {
    id: 12,
    latitude: 42.0524352,
    longitude: -87.6830755,
    name: "811 Emerson St",
    amenities: "Washing, Drying, Pawicure, Grooming",
  },
  {
    id: 13,
    latitude: 42.04703140258789,
    longitude: -87.681884765625,
    name: "1500 Sherman Ave",
    amenities: "Washing, Drying, Pawicure, Grooming",
  },
];

function MyFireBaseHook()
{
  return function WrappedComponent()
    {
      const [locations, loading, error] = useData('/Locations/'); 
      if (error) return <h1>{error}</h1>;
      if (loading) return <h1>Loading Locations...</h1>;
      console.log(locations)
      return <Component Location = {locations}/>;
    };
}

//Initializes the map and marker functionality
export class MapContainer extends Component {
  
  NewComponent = MyFireBaseHook();
  
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
    icon:paws,
    locations:{}
  };

  GetData = () => {
    return function WrappedComponent()
    {
      const [locations, loading, error] = useData('/Locations/'); 
      if (error) return <h1>{error}</h1>;
      if (loading) return <h1>Loading Locations...</h1>;

      return locations;
    };
    
  }

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
      //Renders the panel and the map <MyFireBaseHook/>

      <div id="outline">
      
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
          {Object.values(markers).map((marker) => (
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

import "./App.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import {
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
  ScanBottomNavTxt,
  ScanButtonBottomNav,
  AccountIcon,
  HelpIcon,
  TopBanner,
} from "./styles/mapstyles";
import close from "../src/styles/svgs/close.svg";
import CurrentLocationIcon from "../src/styles/svgs/Location.svg";
import paws from "../src/styles/svgs/paws.png";
import Activepaws from "../src/styles/svgs/ActivePaws.png";
import CurrentLocation from "./Map";
import { database, signInwithG, auth } from "./utilities/firebase.js";

import { onValue, ref } from "firebase/database";

import scanSVG from "../src/styles/svgs/scan.svg";
import accSVG from "../src/styles/svgs/account.svg";
import helpSVG from "../src/styles/svgs/help.svg";
import topLogo from "../src/styles/svgs/SpotLogos.png";

import Profile from "./Profile.js"


/**
 * Defines an instance of the Locator+ solution, to be instantiated
 * when the Maps library is loaded.
 */
// const mapStyles = {
//   width: "428px",
//   height: "934px",
// };

// const instance = (
//   <Panel header="Panel title">
//     <p>HELLO WORLD</p>
//   </Panel>
// );

// let user = null;

const SignInButton = () => {
  // {document.getElementById("user-info").innerHTML = ""};

  return (
    <button className="btn"
      onClick={() => {
        signInwithG();
      }
      }>
      
      Sign In
    </button>
  );
};




// const SignOutButton = (cuser) => {
//   return (<>
//     <p className="email">
//       {window.innerWidth > 800 ? cuser : null}
//       <button className="btn" id="out" style={{ width: 120, margin: 20 }}
//         onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     </p>
//   </>
//   )
// };

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
export const ProfileButton = () => (
  <>
    {/* <button
      type="button"
      className="btn" 
      img = {accSVG}
      onClick={() =>
        ReactDOM.render(<Profile />, document.getElementById("root"))
      }
    > */}
      <input type="image" alt={"accSVG"} src={accSVG} name="saveForm" className="btTxt submit" onClick={() =>
        ReactDOM.render(<Profile />, document.getElementById("root"))
      } >

      </input>

      {/* { window.innerWidth > 600 ? "Add food" : "add"} */}

    {/*  </button> */}
  </>
);

//Initializes the map and marker functionality
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, // Hides or shows the InfoWindow
      activeMarker: {}, // Shows the active marker upon click
      selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
      icon: paws,
      locationList: [],
      currentUser: null
    };
  }
  unsubscribeFromAuth = signInwithG();

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

  onSignIn = () => {
    this.setState({ user: true });
  };

  componentDidMount() {
    const reference = ref(database, "/Locations/");

    onValue(reference, (snapshot) => {
      let locations = [];
      snapshot.forEach((snap) => {
        // snap.val() is the dictionary with all your keys/values from the 'students-list' path
        locations.push(snap.val());
      });

      this.setState({ locationList: locations });
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      //Renders the panel and the map <MyFireBaseHook/>
      <div>
        {!this.state.currentUser ? <SignInButton />: 
        <div id="outline">
          <MainLayout>
            <TopBanner>
              <img src={topLogo} alt={"topLogo"} width="96px" />
            </TopBanner>
            {/* <SignInButton/> */}

            <div id='user-info'>
              {this.state.currentUser ? (<div>
                <div>
                  <img src={this.state.currentUser.photoURL} alt={"photoURL"} />
                </div>
                <div>Name: {this.state.currentUser.displayName}</div>
                <div>Email: {this.state.currentUser.email}</div>

                <button className="btn" onClick={() => auth.signOut()}>Sign Out</button>
              </div>
              ) : <SignInButton />}
            </div>
            <CurrentLocation
              centerAroundCurrentLocation
              google={this.props.google}
            >
              <Marker key={"current"}
                icon={CurrentLocationIcon}
                onClick={this.onMarkerClick}
                name={"Current Location"}
              />
              {/* <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow> */}
              {Object.values(this.state.locationList).map((marker) =>
                <Marker
                  onClick={this.onMarkerClick}
                  icon={this.state.activeMarker === marker ? Activepaws : paws}
                  position={{ lat: marker.latitude, lng: marker.longitude }}
                  key={marker.id}
                  name={marker.name}
                  availability="• Available"
                  price="$3.30 unlock, $0.3 per min"
                  title={marker.amenities}
                />
              )}
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
            <BottomNav>
              <AccountIcon>
                <ProfileButton />
                {/* <img src={accSVG} /> */}
              </AccountIcon>
              <ScanButtonBottomNav>
                <img src={scanSVG} alt={"scanSVG"} />
                <ScanBottomNavTxt>SCAN</ScanBottomNavTxt>
              </ScanButtonBottomNav>
              <HelpIcon>
                <img src={helpSVG} alt={"helpSVG"} />
              </HelpIcon>
            </BottomNav>
            {this.state.showingInfoWindow ? (
              <PanelStyles
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <img
                  src={close}
                  alt={"close"} 
                  onClick={() =>
                    this.setState({
                      showingInfoWindow: false,
                      activeMarker: null,
                    })
                  }
                />
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
        }
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

import React, { useState, useEffect } from "react";

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import { useData, useUserState, signInWithG, signOutOfG, pushToFirebase } from "./utilities/firebase.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faUser, faQrcode, faQuestionCircle } from '@fortawesome/fontawesome-free-solid'

import paww from "../src/styles/svgs/paww.png";
import close from "../src/styles/svgs/close.svg";
import CurrentLocationIcon from "../src/styles/svgs/Location.svg";
import paws from "../src/styles/svgs/paws.png";
 // const ldata = require('./data/stations.json');
import topLogo from "../src/styles/svgs/SpotLogos.png";
import mapStyles from "./styles/mapstyles.js";
import {
  LocationName,
  AvailabilityTxt,
  PriceTxt,
  AmenitiesLayout,
  AmenityName
} from "./styles/prev.js";

import ProfilePage from "./components/profile.js";

/* HELP COMMENT
withGoogleMap initializes the map component while withScriptjs loads the Google Map JavaScript API v3.

withScriptjs requires -
  googleMapURL: String (Google Map API Key)
  loadingElement: ReactElement

withGoogleMap requires -
  containerElement: ReactElement (needs both height & width properties) without which the map won't display.
  mapElement: ReactElement

#the methods basically load libraries that higher order functions that make the map work
*/


const SignInButton = () => (
  <div id="signinpage">
    <img src={topLogo} id="logot" alt="logo"/>
    <button id="signin" className="btn"
      onClick={() => signInWithG()}>
      Sign In
    </button>
    <button id="signup" className="btn"
      onClick={() => signInWithG()}>
        New user? Sign Up with Google
    </button>   
  </div>

);

const SignOutButton = () => (
  <button id="signout" className="btn"
      onClick={() => signOutOfG()}>
    Sign Out
  </button>
);

function amenityMapped(amenities){
  let amList = amenities.split(",");
  return amList.map((amenity, key) => (   
    <div id="eachA" key={key}>
      <FontAwesomeIcon icon={faCheck} className="ficon"/>
      <div>
        <AmenityName>{amenity}</AmenityName>
      </div>
    </div> 
  ))
}

function checkPaymentInfo(val, cvv, date){
  console.log(val);
  console.log(cvv);
  console.log(date);
  if(val && cvv && date){
 
    if((val.toString().length === 16) && (cvv.toString().length === 3)){
      console.log("all valid");
      return 1;
    }
   
    return 0;
  }
  return 0;
}

function checkUser (mdata, user){
    if(mdata[user.uid]){
      // console.log("user exists in users");
      // console.log("pet is " + mdata[user.uid].info.petname);
      return mdata[user.uid].info;
    }
    var info = {"address": "", "email": user.email, "img": user.photoURL, "name": user.displayName, "payment": "", "petname": ""};
    pushToFirebase("/", user.uid, info);
    return info;
  
}

export default function App() { 

  
  const user = useUserState();
  const [mdata, loading, error] =  useData("/");

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>;



  function  Map()  {
 
    const [selectedStation, setSelectedStation] = useState(null);
    
    const [ currentPosition, setCurrentPosition ] = useState({});
    const success = position => {
      const currentPosition = {
        lat: (position.coords.latitude),
        lng: (position.coords.longitude)
      }
      setCurrentPosition(currentPosition);
    };  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success);
    }, [])

    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 42.0565, lng: -87.6753 }}         
        defaultOptions={{ styles: mapStyles }} 
      >
        {mdata.Locations.map(station => (
          <Marker
            key={station.id}
            position={{
              lat: station.latitude,
              lng: station.longitude
            }}
            onClick={() => {
              setSelectedStation(station);
            }}
            icon={{
              url: paws,
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))}


        {
          <Marker 
            position={{
                lat: Number(currentPosition.lat),
                lng: Number(currentPosition.lng)
                }}
            icon={{
              url: CurrentLocationIcon,
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
       } 
            
       {selectedStation && (
          <div>
            <InfoWindow
              onCloseClick={() => {
                setSelectedStation(null);
              }}
              position={{
                lat: selectedStation.latitude,
                lng: selectedStation.longitude
              }}
            >
              <div>
                <h2>{selectedStation.name}</h2>  
              </div>
            </InfoWindow>
 
          </div>
        )}

        {selectedStation && (
          <div id="myModal" className="modal">   
            <img id="clo" alt="closebtn" src={close} onClick={() => {
                  setSelectedStation(null);
                }}/>
            <div className="modal-content">

              <AvailabilityTxt>{selectedStation.avaliable ? "Available": "Not Available"}</AvailabilityTxt>
              <LocationName>{selectedStation.name}</LocationName>
              <PriceTxt>$3.30 unlock, $0.3 per min</PriceTxt>
              <AmenitiesLayout>
                {selectedStation.amenities? 
                  amenityMapped(selectedStation.amenities) : ""}              
              </AmenitiesLayout>

              <center>
                <button id="scanTo" className="btn" onClick={() => document.getElementById("accinfo").style.display = "block"
}>Scan to unlock</button>
              </center>
                    
            </div>
                  
        </div>
        )}

      </GoogleMap>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));
  return (

    <div id="mainlayout">
      {user ?  
        <div style={{ width: "100%", height: "100%" }}>
            <div id="topbanner">
                <div id="profile">
                  <img id="profilepic" alt="profile" src={user.photoURL}/>
                  <p>{user.displayName}</p>
                </div>
                <img src={paww} alt="paw" id="logo"/>
                <SignOutButton/>
            </div>

            <MapWrapped
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcQK-u06gf7heyS6eo0xE-hK__S5XriZs"
              loadingElement={<div style={{ height: `100%` ,width: '100%'}} />}
              containerElement={<div style={{ height: `75%`, width: '100%' }} />}
              mapElement={<div style={{ height: `100%`,width: '100%' }} />}
            />  

            <div id="ppage">
              
              {ProfilePage({"username": user.displayName, "useremail": user.email, "userphoto": user.photoURL, "userid": user.uid, "userinfo": checkUser(mdata.users, user)})}

            </div>
            {/* mdata.users[user.uid].info */}
            <div id="accinfo">
              <div id="accinfoC">
                <p id="detailName"></p>
                
                {/* <label htmlFor="inputid">CCN</label> */}
               
                <input type="number" placeholder="Credit Card Number" id="inputid" 
                  onChange={(e) => document.getElementById("inputid").value = e.target.value}/>
                {/* <label htmlFor="cvvid">CVV</label> */}

                  <input type="number" placeholder="CVV" id="cvvid" 
                  onChange={(e) => document.getElementById("cvvid").value = e.target.value}/>
                  {/* <label htmlFor="dateid">Expiry Date</label> */}

                  <input type="date" placeholder="date" id="dateid" 
                  onChange={(e) => document.getElementById("dateid").value = e.target.value}/>
                <center><button id="savebtn" className="btn"
                  onClick={() => { 

                   
                    let val = checkPaymentInfo(
                      document.getElementById("inputid").value,
                      document.getElementById("cvvid").value,
                      document.getElementById("dateid").value);

                    if(val === 1){
                      console.log("INPUT IS: " + document.getElementById("inputid").value);
                      console.log("SHORTENED: " + document.getElementById("savebtn").getAttribute("data-shortened"));
                      console.log("USER ID: " + user.uid)
                      
                      pushToFirebase(document.getElementById("savebtn").getAttribute("data-shortened"),user.uid, document.getElementById("inputid").value);
      
                      document.getElementById("accinfo").style.display = "none";
                  }
                  else{
                    document.getElementById("inputid").value = "Invalid payment";
                    document.getElementById("cvvid").value = "Invalid cvv";
                    document.getElementById("dateid").value = "Invalid date";
                  }
                  }
                  
                  }>Save</button> </center>
                  <center><button className="btn"  id="cancelbtn" onClick={() =>document.getElementById("accinfo").style.display = "none"}
                  >Cancel</button></center>
              </div>
            </div>

            <div id="bottomnav">
              <FontAwesomeIcon className="botIcons" icon={faUser} 
                  onClick={() => {
                    document.getElementById("ppage").style.display = "block"
                  }}
              />
              <FontAwesomeIcon className="botIcons" icon={faQrcode} />
              <FontAwesomeIcon className="botIcons" icon={faQuestionCircle} />
            </div>
 
      
        </div>
    :
    <SignInButton />
    }
    </div>
  );
}
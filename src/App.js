import React, { useState, useEffect } from "react";

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import {
  useData,
  useUserState,
  signInWithG,
  signOutOfG,
  pushToFirebase,
  changeAvaliability
} from "./utilities/firebase.js";
// import help from "../src/styles/svgs/help.svg";
import account from "../src/styles/svgs/account.svg";
// import scan from "../src/styles/svgs/scan.svg";
// import paww from "../src/styles/svgs/paww.png";
import close from "../src/styles/svgs/close.svg";
import CurrentLocationIcon from "../src/styles/svgs/Location.svg";
import GoToLocation from "../src/styles/svgs/GoToLocation.png";
import GoToHome from "../src/styles/svgs/home.png";
import CheckMarkIcon from "../src/styles/svgs/checkmarkIcon.png"
import paws from "../src/styles/svgs/paws.png";
import Usedpaws from "../src/styles/svgs/ActivePaws.png";
// const ldata = require('./data/stations.json');
import topLogo from "../src/styles/svgs/SpotLogo.svg";
// import mapStyles from "./styles/mapstyles.js";
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
// var TimerStarted = false;

const SignInButton = () =>
  <div id="signinpage">
    <img src={topLogo} id="logot" alt="logo" />
    <button id="signin" className="btn" onClick={() => signInWithG()}>
      Sign In
    </button>
    <button id="signup" className="btn" onClick={() => signInWithG()}>
      New user? Sign Up with Google
    </button>
  </div>;

export const SignOutButton = () =>
  <button id="signin" className="btn" onClick={() => signOutOfG()}>
    Sign Out
  </button>;

function amenityMapped(amenities) {
  let amList = amenities.split(",");
  return amList.map((amenity, key) =>
    <div id="eachA" key={key}>
      <img alt={""} src={CheckMarkIcon} width="12%" height="12%"className="ficon" />
      <AmenityName>
        {amenity}
      </AmenityName>
    </div>
  );
}

function checkPaymentInfo(val, cvv, date) {
  console.log(val);
  console.log(cvv);
  console.log(date);
  if (val && cvv && date) {
    if (val.toString().length === 16 && cvv.toString().length === 3) {
      console.log("all valid");
      return 1;
    }

    return 0;
  }
  return 0;
}

function checkUser(mdata, user) {
  if (mdata[user.uid]) {
    // console.log("user exists in users");
    // console.log("pet is " + mdata[user.uid].info.petname);
    return mdata[user.uid].info;
  }
  var info = {
    address: "",
    email: user.email,
    img: user.photoURL,
    name: user.displayName,
    payment: "",
    petname: ""
  };
  pushToFirebase("/", user.uid, info);
  return info;
}

var x = {lat:41.921634, lng: -87.659558};


export default function App() {
  const user = useUserState();
  const [mdata, loading, error] = useData("/");
  const [curr, setCurr] = useState(x);

  if (error)
    return (
      <h1>
        {error}
      </h1>
    );
  if (loading) return <h1>Loading the data...</h1>;


  function Map() {
    const [selectedStation, setSelectedStation] = useState(null);
    const [currentPosition, setCurrentPosition] = useState({});
    const [timerstate, setTimerstate] = useState(false);
    const [complete, setComplete] = useState(false);
    const [allminute, setAllminute] = useState(0);
    var [totaltime, setTotaltime] = useState("");
    //var [currentAvailiableStation, setCurrentAvaliableStation] = useState(true);
    
    var timerstart;

    const success = position => {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setCurrentPosition(currentPosition);
    };
    
    useEffect(() =>  {
       navigator.geolocation.getCurrentPosition(success);
    }, []);

      
      const updateTimer = () => {
      let myVar;
      function changeTimer() {
        if (!myVar) {
          myVar = setInterval(loopTimer, 1000);
        }
      }

      function loopTimer() {
        //console.log(currentAvailiableStation);
        const d = new Date();
        console.log("in loop timer");
        // document.getElementById("demo").innerHTML  = d}
        if (document.getElementById("timertext")) {
          var diffAllSec = Math.floor((d.getTime() - timerstart) / 1000);
          var sec = diffAllSec % 60;
          var minute = Math.floor(diffAllSec / 60);
          var hour = Math.floor(diffAllSec / 3600);
          setAllminute(Math.ceil(diffAllSec / 60));

          var str = hour
            .toString()
            .concat(":", minute.toString(), ":", sec.toString());
          setTotaltime(str);
          // console.log(document.getElementById("demo"));
          document.getElementById("timertext").innerHTML = str;
        } else {
          console.log("timer stopped in loop Timer");
          clearInterval(myVar);
          myVar = null;
          // setComplete(true);
          // console.log("complete in loop timer",complete);
          setTimerstate(false);
        }
      }

      function stopTimer() {
        clearInterval(myVar);
        myVar = null;
      }

      // if timer not true: haven't started counting
      if (selectedStation && !timerstate && !complete) {
        console.log(
          "timerstate when selected station / timer false / complete false: ",
          timerstate
        );
        console.log(
          "complete when selected station / timer false / complete false: ",
          complete
        );
        return (
          <div id="myModal" className="modal">
            <div className="modal-content">
              <img
                id="clo"
                alt="closebtn"
                src={close}
                onClick={() => {
                  setSelectedStation(null);
                }}
              />

              <AvailabilityTxt>
                {selectedStation.avaliable ? "Available" : "Not Available"}
              </AvailabilityTxt>
              <LocationName>
                {selectedStation.name}
              </LocationName>
              <PriceTxt>
                $3.30 unlock, $0.3 per min
              </PriceTxt>
              <AmenitiesLayout>
                {selectedStation.amenities
                  ? amenityMapped(selectedStation.amenities)
                  : ""}
              </AmenitiesLayout>

              {selectedStation.avaliable?
              <center>
                
               <button
                  id="scanTo"
                  className="btn"
                  onClick={() => {
                    if (document.getElementById("acPay").innerHTML === " ") {
                      document.getElementById("accinfo").style.display =
                        "block";
                      document
                        .getElementById("accinfoC")
                        .setAttribute("loc", "payment");
                      document
                        .getElementById("savebtn")
                        .setAttribute("data-shortened", "payment");
                      // console.log(document.getElementById("acPay").innerHTML)
                      document.getElementById(
                        "customInput"
                      ).innerHTML = `                
                  <input type="number" placeholder="Credit Card Number" id="cardinput" 
                  onChange="{(e) => document.getElementById("cardinput").value = e.target.value}"/>
      
                  <input type="number" placeholder="CVV" id="cvvid" 
                  onChange="{(e) => document.getElementById("cvvid").value = e.target.value}"/>
      
                  <input type="date" placeholder="date" id="dateid" 
                  onChange="{(e) => document.getElementById("dateid").value = e.target.value}"/>
                  `;
                    } else {
                      //setCurrentAvaliableStation(false);
                      
                      timerstart = new Date().getTime();
                      console.log("startTime" + timerstart);
                      // alert("Start Timer!")
                      // TimerStarted = true;
                      var StationID = selectedStation.id;
                      changeAvaliability(StationID, false);
                      
                      setTimerstate(true);
                      changeTimer();
                      //changeAvaliability(StationID, false);
                      //console.log("Push false to firebase");

                    }
                  }}
                >
                  Scan to Unlock
                </button>
                
              </center>
              :
              <div>
                 <center><button id="scanTo"
                  className="btn">Not Availiable</button>
                  <h1>Refresh page to check again</h1>
                  </center>
                  
              </div>
                 
              }


            </div>
          </div>
        );
      } else if (selectedStation && timerstate && !complete) {
        // if timer started and not complete
        return (
          <div id="myModal" className="modal">
            {/* <img id="clo" alt="closebtn" src={close} onClick={() => {
             setSelectedStation(null);
           }} /> */}
            <div className="modal-content">
              <p id="timertext" />
              <p id="rate"> rate: $0.5/min</p>

              <button
                id="timerclick"
                className="btn"
                onClick={() => {
                  // document.getElementById("timerpage").style.display = "block"
                  var stopTime = new Date().getTime();
                  console.log("stopTime " + stopTime);
                  // TimerStarted = false;
                  setTimerstate(false);
                  stopTimer();
                  
                  setComplete(true);
                  // alert("Complete");
                }}
              >
                Complete
              </button>
            </div>
          </div>
        );
      } else if (selectedStation && complete) {
        // if complete
        return (
          <div id="myModal" className="modal">
            <div className="modal-content">
              <div id="thankyou"> Thank you! </div>
              {/* {setComplete(false)} */}
              {console.log(allminute)}
              <div id="finishcost">
                {" "}Total Time: {totaltime}{" "}
              </div>
              <div id="finishcost">
                {" "}Total Cost: ${allminute * 0.5}{" "}
              </div>
              <div id="finishcost">
                The cost will be charged to your account. 
              </div>
              {console.log("complete in thankyou", complete)}

              <button
                id="completeclick"
                className="btn"
                onClick={() => {
                  // document.getElementById("timerpage").style.display = "block"
                  var StationID = selectedStation.id;
                  //console.log(selectedStation);
            
                  setTimerstate(false);
                  setComplete(false);
                 // setCurrentAvaliableStation(true);
                  changeAvaliability(StationID, true);
                  // alert("thank you");
                }}
              >
                {" "}Finish Session{" "}
              </button>
            </div>
          </div>
        );
      }
    }


    // useEffect(
    //   () => {
    //     updateTimer();
        
    //   },
    //   [timerstate]
    // );

    // diplay all locations if timer not started
    // display only selected location if timer started
    const displayLocation = (timerstate, complete) => {
      if (!timerstate && !complete) {
      
        return (
          <div>
            
            {mdata.Locations.map(station =>
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
                  url:  station.avaliable? paws: Usedpaws,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
              />
            )}

            


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

            {selectedStation &&
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
                    <h2>
                      {selectedStation.name}
                    </h2>
                  </div>
                </InfoWindow>
              </div>}
          </div>
        );
      } else if (timerstate && !complete) {
        return (
          <div>
            {
              <Marker
                key={selectedStation.id}
                position={{
                  lat: selectedStation.latitude,
                  lng: selectedStation.longitude
                }}
                icon={{
                  url: paws,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
              />
            }
          </div>
        );
      } else if (!timerstate && complete) {
        return (
          <div>
            {
              <Marker
                key={selectedStation.id}
                position={{
                  lat: selectedStation.latitude,
                  lng: selectedStation.longitude
                }}
                icon={{
                  url: paws,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
              />
            }
          </div>
        );
      }
    };

    // update timer and the panel


    return (
      <div id="withmap">
        {/* {(!TimerStarted)?  */ console.log(currentPosition)}

        <GoogleMap
          defaultZoom={13}
          defaultCenter={curr}
        >
          <img alt="currHome" src={GoToHome} width="10%" onClick={() => {setCurr({lat:x.lat, lng: x.lng})}}></img>
            <img alt="currLoc" src={GoToLocation} width="10%" onClick={() => {setCurr({lat:currentPosition.lat, lng: currentPosition.lng})}}></img>
          {displayLocation(timerstate, complete)}
          {updateTimer()}
        </GoogleMap>


      </div>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));
  return (
    <div id="mainlayout">
      {user
        ? <div style={{ width: "100%", height: "100%" }}>
            <div id="topbanner">
              <img src={topLogo} alt="topLogo" id="logo"  data-cy="profile"/> 
              <img
                alt={""}
                className="botIcons"
                src={account}
                onClick={() => {
                  document.getElementById("ppage").style.display = "block";
                }}
              />
            </div>

         
            <MapWrapped
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcQK-u06gf7heyS6eo0xE-hK__S5XriZs"
              loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
              containerElement={
                <div style={{ height: `80%`, width: "100%" }} />
              }
              mapElement={
                <div style={{ height: `100%`, width: "100%", zIndex: 0 }} />
              }
            />

            <div id="ppage" data-cy="course">
              {ProfilePage({
                username: user.displayName,
                useremail: user.email,
                userphoto: user.photoURL,
                userid: user.uid,
                userinfo: checkUser(mdata.users, user)
              })}
            </div>

            <div id="accinfo">
              <div id="accinfoC">
                <p id="detailName" />

                <div id="customInput" />

                <center>
                  <button
                    id="savebtn"
                    className="btnLogin"
                    onClick={() => {
                      switch (document
                        .getElementById("accinfoC")
                        .getAttribute("loc")) {
                        case "petname":
                          if (document.getElementById("petinput").value) {
                            console.log(
                              "Pet Is: " +
                                document.getElementById("petinput").value
                            );

                            pushToFirebase(
                              document
                                .getElementById("savebtn")
                                .getAttribute("data-shortened"),
                              user.uid,
                              document.getElementById("petinput").value
                            );

                            document.getElementById("accinfo").style.display =
                              "none";
                          } else {
                            alert("invalid info");
                          }

                          break;

                        case "address":
                          if (document.getElementById("homeinput").value) {
                            console.log(
                              "Home Is: " +
                                document.getElementById("homeinput").value
                            );

                            pushToFirebase(
                              document
                                .getElementById("savebtn")
                                .getAttribute("data-shortened"),
                              user.uid,
                              document.getElementById("homeinput").value
                            );

                            document.getElementById("accinfo").style.display =
                              "none";
                          } else {
                            alert("invalid info");
                          }

                          break;
                        case "payment":
                          let val = checkPaymentInfo(
                            document.getElementById("cardinput").value,
                            document.getElementById("cvvid").value,
                            document.getElementById("dateid").value
                          );

                          if (val === 1) {
                            console.log(
                              "INPUT IS: " +
                                document.getElementById("cardinput").value
                            );
                            console.log(
                              "SHORTENED: " +
                                document
                                  .getElementById("savebtn")
                                  .getAttribute("data-shortened")
                            );
                            console.log("USER ID: " + user.uid);

                            pushToFirebase(
                              document
                                .getElementById("savebtn")
                                .getAttribute("data-shortened"),
                              user.uid,
                              document.getElementById("cardinput").value
                            );

                            document.getElementById("accinfo").style.display =
                              "none";
                          } else {
                            alert("invalid info");
                          }

                          break;
                        default:
                          console.log("defaut");
                      }
                    }}
                  >
                    Save
                  </button>{" "}
                </center>
                <center>
                  <button
                    className="btn"
                    id="cancelbtn"
                    onClick={() =>
                      (document.getElementById("accinfo").style.display =
                        "none")}
                  >
                    Cancel
                  </button>
                </center>
              </div>
            </div>

            <div id="bottomnav">
              <button id="savebtn" className="btnLogin">
                Scan
              </button>
            </div>
          </div>
        : <SignInButton />}
    </div>
  );
}

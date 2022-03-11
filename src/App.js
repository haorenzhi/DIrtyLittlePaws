import React, { useState, useEffect } from "react";
import leftArrow from "../src/styles/svgs/back.svg";

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

import {
  useData,
  useUserState,
  signInWithG,
  signOutOfG,
  pushToFirebase,
} from "./utilities/firebase.js";
// import help from "../src/styles/svgs/help.svg";
import account from "../src/styles/svgs/account.svg";
import close from "../src/styles/svgs/close.svg";
import CurrentLocationIcon from "../src/styles/svgs/Location.svg";
import GoToLocation from "../src/styles/svgs/currlocation.svg";
import GoToHome from "../src/styles/svgs/home.svg";
import CheckMark from "../src/styles/svgs/check.svg";
import paws from "../src/styles/svgs/paws.png";
import Usedpaws from "../src/styles/svgs/ActivePaws.png";
import topLogo from "../src/styles/svgs/SpotLogo.svg";

import {
  LocationName,
  AvailabilityTxt,
  PriceTxt,
  UnlockTxt,
  AmenitiesLayout,
  AmenityName,
} from "./styles/prev.js";

import {
  TopBannerDiv,
  AccountDiv,
  TopLogoDiv,
  MapDiv,
  MapButtons,
} from "./styles/styles.js";

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

const SignInButton = () => (
  <div id="signinpage">
    <img src={topLogo} id="logot" alt="logo" />
    <button id="signin" className="btn" onClick={() => signInWithG()}>
      <b>Sign In</b>
    </button>
    <button id="signup" className="btn" onClick={() => signInWithG()}>
      New user? Sign Up with Google
    </button>
  </div>
);

export const SignOutButton = () => (
  <div id="signinbtn">
    <button id="signin" className="btn" onClick={() => signOutOfG()}>
      Log Out
    </button>
  </div>
);

function amenityMapped(amenities) {
  let amList = amenities.split(",");
  return amList.map((amenity, key) => (
    <div id="eachA" key={key}>
      <img alt={CheckMark} src={CheckMark} className="ficon" />
      <AmenityName>{amenity}</AmenityName>
    </div>
  ));
}

function checkPaymentInfo(val, cvv, date) {
  if (val && cvv && date) {
    if (val.toString().length === 16 && cvv.toString().length === 3) {
      return 1;
    }

    return 0;
  }
  return 0;
}

function checkUser(mdata, user) {
  if (mdata[user.uid]) {
    return mdata[user.uid].info;
  }
  var info = {
    address: "",
    email: user.email,
    img: user.photoURL,
    name: user.displayName,
    payment: "",
    petname: "",
  };
  pushToFirebase("/", user.uid, info);
  return info;
}

var x = { lat: 41.921634, lng: -87.659558 };

var CurrentLocation = { lat: 41.921634, lng: -87.659558 };

function ReturnCurrentLocation(lat, lng) {
  CurrentLocation.lat = lat;
  CurrentLocation.lng = lng;
}

export default function App() {
  const user = useUserState();
  const [mdata, loading, error] = useData("/");
  const [curr, setCurr] = useState(x);
  const [click, setclick] = useState(false);
  // const [password, setPassword] = useState(0);


   


  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>;


  

  function Map() {
    const [selectedStation, setSelectedStation] = useState(null);
    const [currentPosition, setCurrentPosition] = useState({});
    var [timerstate, setTimerstate] = useState(false);
    const [complete, setComplete] = useState(false);
    const [allminute, setAllminute] = useState(0);
    var [totaltime, setTotaltime] = useState("");
    var [scanclick, setScanclick] = useState(false);


    var timerstart;
    var timerend;
    var duration;

    console.log(totaltime);

    const success = async (position) => {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      await setCurrentPosition(currentPosition);
    };

    ReturnCurrentLocation(currentPosition.lat, currentPosition.lng);

    useEffect(() => {
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
        const d = new Date();
        if (document.getElementById("timertext")) {
          var diffAllSec = Math.floor((d.getTime() - timerstart) / 1000);
          var sec = diffAllSec % 60;
          sec = ("00" + sec).slice(-2);
          var minute = Math.floor(diffAllSec / 60);
          minute = ("00" + minute).slice(-2);
          var hour = Math.floor(diffAllSec / 3600);
          hour = ("00" + hour).slice(-2);
          setAllminute(Math.ceil(diffAllSec / 60));
          var str = hour
            .toString()
            .concat(":", minute.toString(), ":", sec.toString());
          setTotaltime(str);
          document.getElementById("timertext").innerHTML = str;
        } else {
          clearInterval(myVar);
          myVar = null;
          setTimerstate(false);
        }
      }

      function stopTimer() {
        clearInterval(myVar);
        myVar = null;
      }

      // if timer not true: haven't started counting

      if (selectedStation && !timerstate && !complete && !scanclick) {
        return (
          <div className="modal">
            <div className="modal-content">
              <img
                id="clo"
                alt="closebtn"
                src={close}
                onClick={() => {
                  setSelectedStation(null);
                }}
              />

              <div id="scrollableContent">
                <AvailabilityTxt>
                  {selectedStation.avaliable
                    ? "• Available"
                    : "• Not Available"}
                </AvailabilityTxt>
                <LocationName>{selectedStation.name}</LocationName>
                <PriceTxt>$0.50 per minute</PriceTxt>
                <AmenitiesLayout>
                  {selectedStation.amenities
                    ? amenityMapped(selectedStation.amenities)
                    : ""}
                </AmenitiesLayout>
              </div>

              {selectedStation.avaliable ? (
                <div id="bottomScan">
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
                        document.getElementById(
                          "customInput"
                        ).innerHTML = `
                          <p id = "detailName"> Credit Card Number </p>                
                          <input type="number" placeholder="Credit Card Number" id="cardinput" 
                          onChange="{(e) => document.getElementById("cardinput").value = e.target.value}"/>
                          <p id = "detailName"> CVV </p>
                          <input type="number" placeholder="CVV" id="cvvid" 
                          onChange="{(e) => document.getElementById("cvvid").value = e.target.value}"/>
                          <p id = "detailName"> Date </p>
                          <input type="month" placeholder="date" id="dateid" 
                          onChange="{(e) => document.getElementById("dateid").value = e.target.value}"/>`;
                      } else {
                        setScanclick(true);

                        //   timerstart = new Date().getTime();
                        //   setTimerstate(true);
                        //   changeTimer();
                      }
                    }}
                  >
                    Unlock Station
                  </button>
                </div>
              ) : (
                <div id="bottomScan">
                  <button
                    id="notavailable"
                    className="btnLogin"
                    onClick={() => alert("Location Not Available!")}
                  >
                    Not Available
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      } else if ((scanclick && selectedStation && !timerstate && !complete) || click) {
        console.log("input code page");
        return (
          <div className="modal">
            <div className="modal-content">
              <img
                id="clo"
                alt="closebtn"
                src={close}
                onClick={() => {
                  setSelectedStation(null);
                  setScanclick(false);
                  setclick(false)
                }}
              />
              <UnlockTxt>Enter Station Number</UnlockTxt>

              <center>
                <input
                  id="inputdigit"
                  type="number"
                  placeholder="5 letter PIN"
                  // onChange = {(e) => setPassword(e.target.value)}
                />
              </center>
              <div id="bottomScan">
                <button
                  id="savebtn"
                  className="btn"
                  onClick={() => { 
                    timerstart = new Date().getTime();
                    setTimerstate(true);
                    changeTimer();
                    setclick(false)
                  }}
                >
                  {" "}
                  Start Session
                </button>
              </div>
            </div>
          </div>
        );
      } else if (selectedStation && timerstate && !complete) {
        // if timer started and not complete
        return (
          <div className="modal">
            <div className="modal-content">
              <div id="locationInfo">
                <LocationName>{selectedStation.name}</LocationName>
                <PriceTxt>$0.50 per minute</PriceTxt>
              </div>
              <UnlockTxt>Unlocked Time</UnlockTxt>
              <p id="timertext" />
              <div id="finishcost"> Total Cost: ${allminute * 0.5} </div>
              <center id="bottomScan">
                <button
                  id="timerclick"
                  className="btn"
                  onClick={() => {
                    timerend = new Date().getTime();
                    var diffAllSec = Math.floor((timerend - timerstart) / 1000);
                    var sec = diffAllSec % 60;
                    sec = ("00" + sec).slice(-2);
                    var minute = Math.floor(diffAllSec / 60);
                    minute = ("00" + minute).slice(-2);
                    var hour = Math.floor(diffAllSec / 3600);
                    hour = ("00" + hour).slice(-2);
                    duration = hour
                      .toString()
                      .concat(":", minute.toString(), ":", sec.toString());
                    console.log("hour", hour);
                    console.log("duration", duration);
                    setTimerstate(false);
                    stopTimer();
                    setComplete(true);
                  }}
                >
                  Finish Session
                </button>
              </center>
            </div>
          </div>
        );
      } else if (selectedStation && complete) {
        // if complete
        return (
          <div className="modal">
            <div className="modal-content">
              <div>
                <img
                  id="clo"
                  alt="closebtn"
                  src={close}
                  onClick={() => {
                    setTimerstate(false);
                    setComplete(false);
                    setScanclick(false);
                    setSelectedStation(null);
                  }}
                />
                <div id="thankyou"> Thank you for using Spot! </div>
              </div>
              <UnlockTxt>Unlocked Time</UnlockTxt>
              <p id="timertext2">{duration}</p>
              <div id="finishcost"> Total Cost: ${allminute * 0.5} </div>

              {/* <div id="bottomScan">
                <button
                  id="savebtn"
                  className="btnLogin"
                  onClick={() => {
                    setTimerstate(false);
                    setComplete(false);
                    setScanclick(false);
                  }}
                >
                  {" "}Complete{" "}
                </button>
              </div> */}
            </div>
          </div>
        );
      }
    };

    // diplay all locations if timer not started
    // display only selected location if timer started
    const displayLocation = (timerstate, complete) => {
      if (!timerstate && !complete && !scanclick) {
        return (
          <div>
            {mdata.Locations.map((station) => (
              <Marker
                key={station.id}
                position={{
                  lat: station.latitude,
                  lng: station.longitude,
                }}
                onClick={() => {
                  setSelectedStation(station);
                }}
                icon={{
                  url: station.avaliable ? paws : Usedpaws,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}

            {
              <Marker
                position={{
                  lat: Number(currentPosition.lat),
                  lng: Number(currentPosition.lng),
                }}
                icon={{
                  url: CurrentLocationIcon,
                  scaledSize: new window.google.maps.Size(25, 25),
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
                    lng: selectedStation.longitude,
                  }}
                >
                  <div>
                    <h2>{selectedStation.name}</h2>
                  </div>
                </InfoWindow>
              </div>
            )}
          </div>
        );
      } else if (!timerstate && !complete && scanclick) {
        return (
          <div>
            {
              <Marker
                key={selectedStation.id}
                position={{
                  lat: selectedStation.latitude,
                  lng: selectedStation.longitude,
                }}
                icon={{
                  url: paws,
                  scaledSize: new window.google.maps.Size(25, 25),
                }}
              />
            }
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
                  lng: selectedStation.longitude,
                }}
                icon={{
                  url: paws,
                  scaledSize: new window.google.maps.Size(25, 25),
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
                  lng: selectedStation.longitude,
                }}
                icon={{
                  url: paws,
                  scaledSize: new window.google.maps.Size(25, 25),
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
        <GoogleMap defaultZoom={13} defaultCenter={curr}>
          {displayLocation(timerstate, complete)}
          {updateTimer()}
        </GoogleMap>
      </div>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));

  return (
    <div id="mainlayout">
      {user ? (
        <div style={{ width: "100%", height: "100%" }}>
          <TopBannerDiv>
            <AccountDiv>
              <img
                alt={""}
                height="35%"
                src={account}
                onClick={() => {
                  document.getElementById("ppage").style.display = "block";
                }}
              />
            </AccountDiv>
            <TopLogoDiv>
              <img
                src={topLogo}
                alt="topLogo"
                id="logo"
                height="36px"
                data-cy="profile"
              />
            </TopLogoDiv>
          </TopBannerDiv>

          <MapDiv>
            <MapWrapped
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcQK-u06gf7heyS6eo0xE-hK__S5XriZs"
              loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
              containerElement={
                <div style={{ height: `100%`, width: "100%" }} />
              }
              mapElement={
                <div style={{ height: `100%`, width: "100%", zIndex: 0 }} />
              }
            />
            <MapButtons>
              <img
                alt="currHome"
                src={GoToHome}
                onClick={() => {
                  setCurr({ lat: x.lat, lng: x.lng });
                }}
              />
              <img
                alt="currLoc"
                src={GoToLocation}
                onClick={() => {
                  setCurr({
                    lat: CurrentLocation.lat,
                    lng: CurrentLocation.lng,
                  });
                }}
              />
            </MapButtons>
          </MapDiv>

          <div id="ppage" data-cy="course">
            {ProfilePage({
              username: user.displayName,
              useremail: user.email,
              userphoto: user.photoURL,
              userid: user.uid,
              userinfo: checkUser(mdata.users, user),
            })}
          </div>

          <div id="accinfo">
            <div id="accinfoC">
              <div id="accheader">
                <img
                  alt={""}
                  src={leftArrow}
                  className="back"
                  onClick={() =>
                    (document.getElementById("accinfo").style.display = "none")
                  }
                />
                <p>Account details</p>
              </div>
              <p id="detailName" />
              <div id="customInput" />
              <center>
                <button
                  id="cancelbtn"
                  className="btn"
                  onClick={() => {
                    switch (
                      document.getElementById("accinfoC").getAttribute("loc")
                    ) {
                      case "petname":
                        if (document.getElementById("petinput").value) {
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

                          pushToFirebase(
                            "state",
                            user.uid,
                            document.getElementById("homeinput2").value
                          );

                          pushToFirebase(
                            "city",
                            user.uid,
                            document.getElementById("homeinput3").value
                          );

                          pushToFirebase(
                            "zipcode",
                            user.uid,
                            document.getElementById("homeinput4").value
                          );

                     
                          document.getElementById("accinfo").style.display =
                            "none";

                        
                            const url = "https://maps.googleapis.com/maps/api/geocode/json?address="+document.getElementById("homeinput").value+"%20%20"+document.getElementById("homeinput3").value+"%20"+document.getElementById("homeinput2").value+"%20&key=AIzaSyC0DQ7ymkbd9IozyJFce1qp6x4ljaYj8ns";
                            fetch(url)
                              .then((response) => response.json())
                              .then((json) => {x = json.results[0].geometry.location;
                                                pushToFirebase(
                                                  "Homelatlng",
                                                  user.uid,
                                                  x
                                                );})
                              .catch((error) => console.log(error));
                            console.log(x);
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

                          pushToFirebase(
                            "cvv",
                            user.uid,
                            document.getElementById("cvvid").value
                          );
                          pushToFirebase(
                            "expDate",
                            user.uid,
                            document.getElementById("dateid").value
                          );

                          document.getElementById("accinfo").style.display =
                            "none";
                        } else {
                          alert("invalid info");
                        }

                        break;

                      default:
                        console.log("default");
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
                    (document.getElementById("accinfo").style.display = "none")
                  }
                >
                  Cancel
                </button>
              </center>
            </div>
          </div>

          <div id="bottomnav">
            <button
              id="savebtn"
              className="btnLogin"
              onClick={() => 
                {if (document.getElementById("acPay").innerHTML === " ") {
                  document.getElementById("accinfo").style.display =
                    "block";
                  document
                    .getElementById("accinfoC")
                    .setAttribute("loc", "payment");
                  document
                    .getElementById("savebtn")
                    .setAttribute("data-shortened", "payment");
                  document.getElementById(
                    "customInput"
                  ).innerHTML = `   
                    <p id = "detailName"> Credit Card Number </p>             
                    <input type="number" placeholder="Credit Card Number" id="cardinput" 
                    onChange="{(e) => document.getElementById("cardinput").value = e.target.value}"/>
                    <p id = "detailName"> CVV </p>
                    <input type="number" placeholder="CVV" id="cvvid" 
                    onChange="{(e) => document.getElementById("cvvid").value = e.target.value}"/>
                    <p id = "detailName"> Date </p>
                    <input type="month" placeholder="date" id="dateid" 
                     onChange="{(e) => document.getElementById("dateid").value = e.target.value}"/>`;
                } else {
                  setclick(true)
                }
              }
            }
            >
              Unlock
            </button>
          </div>
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}

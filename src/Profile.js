import React from "react";
import ReactDOM from "react-dom";
import MapContainer from "./App";
import { MainLayout } from "./styles/mapstyles";
import backSVG from "../src/styles/svgs/Vector.svg";
import { pushToFirebase } from "./utilities/firebase";
import { useState } from "react";
import { onValue, ref, get } from "firebase/database";
import { database } from "./utilities/firebase";

export const Profile = ({ user }) => {
  

  const [userDogname, setuserDogname] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [userPayment, setuserPayment] = useState("");

  get(ref(database, `users/${user.uid}/info/`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      setuserDogname(data.dogname)
      setuserAddress(data.address)
      setuserPayment(data.payment)
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  const [address, setAddress] = useState("");
  const [dogname, setDogname] = useState("");
  const [payment, setPayment] = useState("");

  const update = ({ address, dogname, payment, user}) => {
    const infox = {
      name: user.displayName,
      email: user.email,
      img: user.photoURL,
      dogname: dogname === "" ? userDogname : dogname,
      address: address === "" ? userAddress : address,
      payment: payment === "" ? userPayment : payment,
    };
    const newInfo = { ...infox };
    pushToFirebase(newInfo, user);
    setDogname("");
    setAddress("");
    setPayment("");
    onValue(ref(database, `users/${user.uid}/info/dogname`), (snapshot) => {
      const data = snapshot.val();
      setuserDogname(data)
    }, {
      onlyOnce: true
    })

    onValue(ref(database, `users/${user.uid}/info/address`), (snapshot) => {
      const data = snapshot.val();
      setuserAddress(data)
    }, {
      onlyOnce: true
    })

    onValue(ref(database, `users/${user.uid}/info/payment`), (snapshot) => {
      const data = snapshot.val();
      setuserPayment(data)
    }, {
      onlyOnce: true
    })
  };

  return (
    <MainLayout>
    {/* <PanelStyles> */}
      <div id="pp">
        {/* <button
          onClick={() =>
            ReactDOM.render(<MapContainer />, document.getElementById("root"))
          }
        >
          Back
        </button> */}


        <div id="accountDetail"></div>


        <div className="details">

          <div id="left">
          <input
            type="image"
            alt={"backSVG"}
            src={backSVG}
            name="saveForm"
            className="btTxt submit"
            onClick={() =>
              ReactDOM.render(<MapContainer />, document.getElementById("root"))
            }
          ></input>
            <div id="profpic">
            <div>
              <img src={user.photoURL} alt={"photoURL"} />
            </div>
          </div>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>Dog's Name: {userDogname} </p>
                <input value={dogname} onChange = {(e) => setDogname(e.target.value)} placeholder="Enter your dog's name"/>
                <button onClick = {()=>update({address, dogname, payment, user})} >submit</button>
            <p>Address: {userAddress}</p>
                <input value={address} onChange = {(e) => setAddress(e.target.value)} placeholder="Enter your address"/>
                <button onClick = {()=>update({address, dogname, payment, user})} >submit</button>
            <p> Payment: {userPayment}</p>
               <input value={payment} onChange = {(e) => setPayment(e.target.value)} placeholder="Enter your payment method"/>
               <button onClick = {()=>update({address, dogname, payment, user})} >submit</button>

          </div>
          
          {/* <div id="ic">
            <i className="fa-solid fa-caret-right"></i>
          </div> */}
        </div>
      </div>
    {/* </PanelStyles> */}
    </MainLayout>
  );
};

export default Profile;

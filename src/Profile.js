import React, { Component } from "react";
import ReactDOM from "react-dom";
import MapContainer from "./App";
import { MainLayout,PanelStyles} from "./styles/mapstyles";
import backSVG from "../src/styles/svgs/Vector.svg";
import { pushToFirebase } from "./utilities/firebase";
import { useState } from "react";
// const renderUserProfile = (user) => {
//   return (
//     <div>
//       <div>
//         <img src={user.photoURL} alt={"photoURL"} />
//       </div>
//       <div>Name: {user.displayName}</div>
//       <div>Email: {user.email}</div>
//     </div>
//   );
// };

const update = (address, user) => {
    // setAddress(address)
    const infox = {
      name: user.displayName,
      email: user.email,
      img: user.photoURL,
      address: address,
    };
    console.log(`Update ${address}`)
    const id = Math.round(Math.random() * 100000);
    const newInfo = { id, ...infox };
    pushToFirebase(newInfo, user);
  };

export const Profile = ({ user }) => {

  //   constructor(props) {
  //     super(props);
  //     this.state = {};
  //   }

  //   (
  //     <div>
  // <div>
  //   <img
  //     src={this.state.currentUser.photoURL}
  //     alt={"photoURL"}
  //   />
  // </div>
  //       <div>Name: {this.state.currentUser.displayName}</div>
  //       <div>Email: {this.state.currentUser.email}</div>

  //       <button className="btn" onClick={() => auth.signOut()}>
  //         Sign Out
  //       </button>
  //     </div>
  //   )
  const [address, setAddress] = useState("!!!");

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
            <p>Dog's Name: </p>
            <p>Email: {user.email}</p>
            <p>Address: {address}</p>
                <input value={address} onChange = {(e) => setAddress(e.target.value)} placeholder="Enter your address"/>
            {/* {update(address, user)} */}
            <button id="submitAddress" onClick={update(address, user)}> submit </button>
            <p> Payment: </p>
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

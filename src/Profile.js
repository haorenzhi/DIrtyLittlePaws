import React from "react";
import ReactDOM from "react-dom";
import MapContainer from "./App";
import { MainLayout } from "./styles/mapstyles";
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
  const [address, setAddress] = useState("");
  const [dogname, setDogname] = useState("");
  const [payment, setPayment] = useState("");
  const update = ({ address,dogname, payment, user}) => {
    // setAddress(address)
    // setDogname(dogname)
    console.log(`Update ${dogname}`)
    const infox = {
      name: user.displayName,
      email: user.email,
      img: user.photoURL,
      address: address,
      dogname: dogname,
      payment: payment,
    };
    // console.log(`Update ${address}`)
    // const id = Math.round(Math.random() * 100000);
    const newInfo = { ...infox };
    pushToFirebase(newInfo, user);
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
            <p>Dog's Name: {dogname} </p>
                <input value={dogname} onChange = {(e) => setDogname(e.target.value)} placeholder="Enter your dog's name"/>
                <button onClick = {()=>update({address, dogname, payment, user})} >submit</button>
            <p>Address: {address}</p>
                <input value={address} onChange = {(e) => setAddress(e.target.value)} placeholder="Enter your address"/>
                <button onClick = {()=>update({address, dogname, payment, user})} >submit</button>
            <p> Payment: {payment}</p>
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

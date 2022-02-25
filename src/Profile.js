import React, { Component } from "react";
import ReactDOM from "react-dom";
import MapContainer from "./App";
import { MainLayout } from "./styles/mapstyles";

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
  console.log(user.displayName);

  return (
    <MainLayout>
      <div id="pp">
        <div
          onClick={() =>
            ReactDOM.render(<MapContainer />, document.getElementById("root"))
          }
        >
          Back
        </div>
        <div id="accountDetail"></div>
        <div id="profpic">
          <div>
            <img src={user.photoURL} alt={"photoURL"} />
          </div>
        </div>

        <div className="details">
          <div id="left">
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>Address: </p>
          </div>
          <input placeholder="Enter your address"></input>
          <button id="submitAddress"></button>
          <div id="ic">
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;

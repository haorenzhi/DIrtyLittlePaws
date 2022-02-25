import React, { Component } from "react";
import ReactDOM from "react-dom";
import MapContainer from "./App"

export class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }



    render(){
        return(

            <div id="pp">
                <div onClick = {() => ReactDOM.render(<MapContainer />, document.getElementById("root"))}>Back</div>
                <div id="accountDetail">
                </div>
                <div id="profpic">
                    <img className="profpic" alt={"pic1"} width="40px" height="40px" border-radius="50%" src="https://picsum.photos/600/430?id=412"></img>
                    <img className="profpic" alt={"pic2"} width="40px" height="40px" border-radius="50%" src="https://picsum.photos/600/430?id=412"></img>
                </div>
                
                <div className = "details">
                    <div id="left">
                        <p>
                            Name
                        </p>
                        <p>
                            Abeni
                        </p>
                    </div>
                    <div id="ic">
                        <i className = "fa-solid fa-caret-right"></i>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;

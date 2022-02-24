import React, { Component } from "react";

export class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }



    render(){
        return(

            <div id="pp">
                <div id="accountDetail">
                </div>
                <div id="profpic">
                    <img class="profpic" alt={"pic1"} width="40px" height="40px" border-radius="50%" src="https://picsum.photos/600/430?id=412"></img>
                    <img class="profpic" alt={"pic2"} width="40px" height="40px" border-radius="50%" src="https://picsum.photos/600/430?id=412"></img>
                </div>
                
                <div class="details">
                    <div id="left">
                        <p>
                            Name
                        </p>
                        <p>
                            Abeni
                        </p>
                    </div>
                    <div id="ic">
                        <i class="fa-solid fa-caret-right"></i>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;

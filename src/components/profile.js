
import leftArrow from "../styles/svgs/back.svg";
import rightArrow from "../styles/svgs/close.svg";
import { SignOutButton } from "../App";
// import {useUserState} from "../utilities/firebase.js";


function handleClick(box){
    document.getElementById("accinfo").style.display = "block";
    // document.getElementById("inputid").value = "";

    var label;
    var shortened;
    switch(box){
        case 1:
            label = "Name";
            shortened = "name";
            break;
        case 2: 
            label = "Email";
            shortened = "email";
            break;
        case 3:
            label = "Pet Name";
            shortened = "petname";
            document.getElementById("customInput").innerHTML = customInput(box);
            document.getElementById("accinfoC").setAttribute("loc", shortened);

            break;
        case 4:
            label = "Home Address";
            shortened = "address";
            document.getElementById("customInput").innerHTML = customInput(box);
            document.getElementById("accinfoC").setAttribute("loc", shortened);

            break;
        case 5:
            label = "Payment";
            shortened = "payment";
            document.getElementById("customInput").innerHTML = customInput(box);
            document.getElementById("accinfoC").setAttribute("loc", shortened);

            break;
        case 6:
            label = "Code";
            shortened = "code";
            document.getElementById("customInput").innerHTML = customInput(box);
            document.getElementById("accinfoC").setAttribute("loc", shortened);

            break;
        default:
            console.log("Default for Account details");
    }
    console.log("label is " + label);
    document.getElementById("detailName").innerHTML = label;
    document.getElementById("savebtn").setAttribute("data-shortened", shortened);

    
}

var curUser = null

function customInput(box){


    switch(box){
        case 3:
            return (`<input type="text" 
            placeholder="Pet Name" 
            id="petinput" 
            onChange="{(e) => document.getElementById("petinput").value = e.target.value}"/>`);
         
        case 4:
            return (`
            
            <input type="text" value="${curUser.userinfo.address}" placeholder="Home Address" id="homeinput" 
            onChange="{(e) => document.getElementById("homeinput").value = e.target.value}"/>

            <input type="text" value="`+curUser.userinfo.city+`" placeholder="City" id="homeinput3" 
            onChange="{(e) => document.getElementById("homeinput3").value = e.target.value}"/>
                        
            <input type="text" value="`+curUser.userinfo.state+`" placeholder="State" id="homeinput2" 
            onChange="{(e) => document.getElementById("homeinput2").value = e.target.value}"/>

            <input type="text" value="`+curUser.userinfo.zipcode+`" placeholder="Zip code" id="homeinput4" 
            onChange="{(e) => document.getElementById("homeinput4").value = e.target.value}"/>
            
            `);
        
        case 5:
            return (`                
            <input type="number" placeholder="Credit Card Number" id="cardinput" 
            onChange="{(e) => document.getElementById("cardinput").value = e.target.value}"/>

            <input type="number" placeholder="CVV" id="cvvid" 
            onChange="{(e) => document.getElementById("cvvid").value = e.target.value}"/>

            <input type="month" placeholder="date" id="dateid" 
            onChange="{(e) => document.getElementById("dateid").value = e.target.value}"/>
            `);
        default:
            return;
    }
}

const ProfilePage = (user) => {

    // console.log("Profile page clicked");
    // console.log("user is " + user.username);
    // console.log("user info from profile " + user.userinfo.name);
    curUser = user
   
    return (
        <div>
            <div id="accheader">
                <img alt={""} src={leftArrow} className="back" 
                    onClick={()=> document.getElementById("ppage").style.display = "none"}/>
                <p>Account details</p>
            </div>
            <div id="accphoto">
                <p id = "">Profile Photo</p>
                <img src={user.userphoto} alt="userphoto"></img>
            </div>
            <div id="accdetails">

                <div className="accinfo">
                    <div className="eachDetail">
                        <p>Name</p>
                        <p id="acName">{user.username}</p>
                    </div>
                </div>
                <div className="accinfo" >
                    <div className="eachDetail">
                        <p>Email</p>
                        <p id="acEmail">{user.useremail}</p>
                    </div>
                </div>
                <div className="accinfo" onClick={ () => handleClick(3)}>
                    <div className="eachDetail">
                        <p>Pet's Name</p>
                        <p id="acPet">{user.userinfo.petname}</p>
                    </div>

                    <img alt={""} src={rightArrow} className="carats"/>

                </div>
                <div className="accinfo" onClick={ () => handleClick(4)}>
                    <div className="eachDetail"> 
                        <p>Home Address</p>
                        <p id="acHome">{user.userinfo.address}. {user.userinfo.city} {user.userinfo.state}, {user.userinfo.zipcode}</p>
                    </div>

                    <img alt={""} src={rightArrow} className="carats"/>

                </div>
                <div className="accinfo" onClick={ () => handleClick(5)}>
                    <div className="eachDetail"> 
                        <p>Payment</p>
                        <p id="acPay"> {user.userinfo.payment}</p>
                    </div>

                    <img alt={""} src={rightArrow} className="carats"/>

                </div>
                <SignOutButton />
            </div>
        </div>
    );
    
}

export default ProfilePage;
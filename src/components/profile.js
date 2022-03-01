import { faArrowLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function handleClick(box){
    document.getElementById("accinfo").style.display = "block";
    document.getElementById("inputid").value = "";

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
            document.getElementById("accinfo").setAttribute("Location", "petname");
            break;
        case 4:
            label = "Home Address";
            shortened = "address";
            document.getElementById("accinfo").setAttribute("Location", "address");
            break;
        case 5:
            label = "Payment";
            shortened = "payment";
            document.getElementById("accinfo").setAttribute("Location", "payment");
            break;
        default:
            console.log("Default for Account details");
    }
    console.log("label is " + label);
    document.getElementById("detailName").innerHTML = label;

    document.getElementById("savebtn").setAttribute("data-shortened", shortened);

    
}

const ProfilePage = user => {

    // console.log("Profile page clicked");
    // console.log("user is " + user.username);
    // console.log("user info from profile " + user.userinfo.name);

   
    return (
        <div>
            <div id="accheader">
                <FontAwesomeIcon icon={faArrowLeft} className="back" 
                    onClick={()=> document.getElementById("ppage").style.display = "none"}/>
                <p>Account details</p>
            </div>
            <div id="accphoto">
                <p>Profile Photo</p>
                <img src={user.userphoto} alt="userphoto"></img>
            </div>
            <div id="accdetails">

                <div className="accinfo" >
                    <div className="eachDetail">
                        <p>Name</p>
                        <p id="acName">{user.username}</p>
                    </div>
                    
                    <FontAwesomeIcon icon={faCaretRight} className="carats"/>
                </div>
                <div className="accinfo" >
                    <div className="eachDetail">
                        <p>Email</p>
                        <p id="acEmail">{user.useremail}</p>
                    </div>
                    
                    <FontAwesomeIcon icon={faCaretRight} className="carats"/>

                </div>
                <div className="accinfo" onClick={ () => handleClick(3)}>
                    <div className="eachDetail">
                        <p>Pet's Name</p>
                        <p id="acPet">{user.userinfo.petname}</p>
                    </div>

                    <FontAwesomeIcon icon={faCaretRight} className="carats" />

                </div>
                <div className="accinfo" onClick={ () => handleClick(4)}>
                    <div className="eachDetail"> 
                        <p>Home Address</p>
                        <p id="acHome">{user.userinfo.address}</p>
                    </div>

                    <FontAwesomeIcon icon={faCaretRight} className="carats"/>

                </div>
                <div className="accinfo" onClick={ () => handleClick(5)}>
                    <div className="eachDetail"> 
                        <p>Payment</p>
                        <p id="acPay"> {user.userinfo.payment}</p>
                    </div>

                    <FontAwesomeIcon icon={faCaretRight} className="carats" />

                </div>
            </div>
        </div>
    );
    
}

export default ProfilePage;
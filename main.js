
// Variables
var purchaseType = "";
var supportEmail = "";
var accessCode = "";
var organizationName = "";

// Transistions from the purchase type form to the specific form
function showNextForm()
{
    var radios = document.getElementsByName('formButton');
    
    for (let i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
            switch (radios[i].value)
            {
                case "Private Organization":
                    purchaseType = "Private Organization"
                    document.getElementById("purchaseTypeForm").style.display = "none"
                    document.getElementById("privateOrganizationForm").style.display = "inline"
                    return;

                case "Community":
                    purchaseType = "Community"
                    document.getElementById("purchaseTypeForm").style.display = "none"
                    document.getElementById("communityForm").style.display = "inline"
                    return;

                case "Individual Chat":
                    purchaseType = "Individual Chat"
                    document.getElementById("purchaseTypeForm").style.display = "none"
                    document.getElementById("individualChatForm").style.display = "inline"
                    return;

                default:
                    break;
            }
        }
    }

    alert("Please fill out the form!");
}

// Back button
function showFirstForm()
{
    document.getElementById("purchaseTypeForm").style.display = "inline"
    document.getElementById("privateOrganizationForm").style.display = "none"
    document.getElementById("communityForm").style.display = "none"
    document.getElementById("individualChatForm").style.display = "none"
}


function showPaymentForm()
{
    document.getElementById("purchaseTypeForm").style.display = "none"
    document.getElementById("privateOrganizationForm").style.display = "none"
    document.getElementById("communityForm").style.display = "none"
    document.getElementById("individualChatForm").style.display = "none"
}

function showChatCreate()
{
    if (purchaseType == "Private Organization")
    {
        supportEmail = document.getElementById("Private support email").value;
        accessCode = document.getElementById("Private password").value;
        organizationName = document.getElementById("Private organization name").value;
    }
    else
    {
        supportEmail = document.getElementById("Support email").value;
        organizationName = document.getElementById("Organization name").value;
    }

    document.getElementById("privateOrganizationForm").style.display = "none"
    document.getElementById("communityForm").style.display = "none"
}


function login()
{
    window.location = 'adminPage.html';
    let userEmail = document.getElementById("userLoginEmail").value;
    let userPassword = document.getElementById("userLoginPassword").value;

    if (userEmail == "" || userPassword == "")
    {
        alert("Please fill out the information!");
    }
    else
    {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) 
        {
            var errorMessage = error.message;
            alert("Error: " + errorMessage);
        });
    }      
}



function checkCurrentGroups()
{
    let chatName = document.getElementById("chatNameInput").value;
    let selectedGroup = document.getElementById("groups").value;

    //alert('/Community/Global/' + selectedGroup.value)

    return fireabase.database().ref('/Community/Global/Chats/').once('value').then(snap => {

        alert("Here")

        snap.forEach((childSnapshot) => {
            if (childSnapshot.key == chatName)
            {
                alert("This chat already exists!")
            }
        })

        //showPaymentForm();

    })
}
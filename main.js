
// Variables
var purchaseType = "";
var supportEmail = "";
var accessCode = "";
var organizationName = "";
var chatName = "";
var selectedTopic  = "";

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
    // document.getElementById("purchaseTypeForm").style.display = "none"
    // document.getElementById("privateOrganizationForm").style.display = "none"
    // document.getElementById("communityForm").style.display = "none"
    document.getElementById("individualChatForm").style.display = "none"
    document.getElementById("stripeForm").style.display = "inline"
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
    chatName = document.getElementById("chatNameInput").value;
    selectedTopic = document.getElementById("groups").value;

    if (chatName)
    {
        firebase.database().ref('/Community/Global/Chats/').on('value', function(snapshot) 
        {
            snapshot.forEach(function(childSnapshot) 
            {
                if (childSnapshot.key == chatName)
                {
                    alert("This chat already exists!")
                }
            });

            showPaymentForm();
        });
    }
    else
    {
        alert("Please fill out the information!");
    }
}

function updateTable(chatName)
{
    var table = document.getElementById("adminTable");
    var row = table.insertRow(1);
    var chatCell = row.insertCell(0);
    var unsubscribeCell = row.insertCell(1);
    chatCell.innerHTML = chatName;
    unsubscribeCell.innerHTML = "Unsubscribe";
}

function test()
{
    alert("The test worked!")
}

function getUserSubscriptions()
{
    var uid = firebase.auth().currentUser.uid;

    firebase.database().ref('/Users/' + uid + '/Subscriptions').on('value', function(snapshot) 
    {
        if (snapshot.exists())
        {
            var table = document.getElementById("adminTable");
            table.deleteRow(1);
            snapshot.forEach(function(childSnapshot) 
            {
                childSnapshot.forEach(function(secondChildSnapshot) 
                {
                    if (secondChildSnapshot.key == "Chat")
                    {
                        updateTable(secondChildSnapshot.val());
                    } 
                });
            });
        }
    });
}

function createGroup()
{
    firebase.database().ref('/Community/Global/' + selectedTopic + '/' + chatName).set(chatName);
}
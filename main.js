
// Variables
var purchaseType = "";

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
                    break;

                case "Community":
                    purchaseType = "Community"
                    document.getElementById("purchaseTypeForm").style.display = "none"
                    document.getElementById("communityForm").style.display = "inline"
                    break;

                case "Individual Chat":
                    purchaseType = "Individual Chat"
                    document.getElementById("purchaseTypeForm").style.display = "none"
                    document.getElementById("individualChatForm").style.display = "inline"
                    break;

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
    alert(purchaseType);
}
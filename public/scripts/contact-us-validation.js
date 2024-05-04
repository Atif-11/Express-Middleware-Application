function seterror(id, error) {
    element = document.getElementById(id);
    element.getElementsByClassName('formError')[0].innerHTML = error;
}

function clearErrors() {
    errors = document.getElementsByClassName('formError');
    for (let item of errors) {
        item.innerHTML = "";
    }
}

function validateForm() {
    var returnVal = true;
    clearErrors();

    var name = document.forms['myForm']["fname"].value;
    if (name.length < 2) {
        seterror("name", "*Length of the name is too short");
        returnVal = false;
    }

    var email = document.forms['myForm']["femail"].value;
    if (email.length < 5) {
        seterror("email", "Email length is too short");
        returnVal = false;
    } else {
        var atposition = email.indexOf("@");
        var dotposition = email.lastIndexOf(".");
        if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
            seterror("email", "Please enter a valid email address");
            returnVal = false;
        }
    }

    var gender = document.forms['myForm']["fgender"].value;
    if (gender === "") {
        seterror("gender", "Please select a gender");
        returnVal = false;
    }

    var comment = document.forms['myForm']["fcomment"].value;
    if (comment.length < 5) {
        seterror("comment", "Comment length is too short");
        returnVal = false;
    }

    return returnVal;
}

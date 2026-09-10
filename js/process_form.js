//form validation
document.addEventListener('DOMContentLoaded', function () {
    //switch to validate data with required patterns based on input
    function validateData(type, data) {
        var regex;
        switch (type) {

            case 'firstName':
                // make sure check that something has been entered, the user entered only letters, and that inpout starts with capital letter
                regex = /^[A-Z][a-zA-Z]*$/;
                break;

            case 'lastName':
                ////check that something has been entered, the user has entered only letters, spaces or apostrophes and that input starts with capital letter
                regex = /^[A-Z][a-zA-Z\s']*$/;
                break;
            case 'phoneNumber':
                //must be numbers, and XXX XXX-XXXX
                regex = /^\d{3} \d{3}-\d{4}$/;
                break;
            case 'email':
                //check that input follows bla@blah.com/edu
                regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu)$/;
                break;
            case 'websiteURL':
                //check for ~, trailing /, and https://
                regex = /^https:\/\/.*~.*\/$/;
                break;
            default:
                return false;
        }
        return regex.test(data);
    }
    function validateQuestions(name) {
        let radios = document.getElementsByName(name);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) return true;
        }
        return false;
    }
    //get the hints to appear for valid and invalid
    function addInputListener(inputId, validHintId, invalidHintId) {
        var input = document.getElementById(inputId);
        var validHint = document.getElementById(validHintId);
        var invalidHint = document.getElementById(invalidHintId);

        input.addEventListener('input', function () {
            if (validateData(input.id, input.value)) {
                validHint.style.display = 'block';
                invalidHint.style.display = 'none';
            } else {
                validHint.style.display = 'none';
                invalidHint.style.display = 'block';
            }
        });
    }

    //make listeners for all the inputs
    addInputListener('firstName', 'validFirstNameHint', 'invalidFirstNameHint');
    addInputListener('lastName', 'validLastNameHint', 'invalidLastNameHint');
    addInputListener('phoneNumber', 'validPhoneNumberHint', 'invalidPhoneNumberHint');
    addInputListener('email', 'validEmailHint', 'invalidEmailHint');
    addInputListener('websiteURL', 'validUrlHint', 'invalidUrlHint');
    //listeners for form submission
    document.getElementById('userForm').addEventListener('submit', function (event) {
        event.preventDefault();
        if (!validateQuestions('question1') || !validateQuestions('question2')) {
            alert('Please answer the survey questions before submitting.');
            return;
        }

        var userInputs = ['firstName', 'lastName', 'phoneNumber', 'email', 'websiteURL'];

        for (var i = 0; i < userInputs.length; i++) {
            var userInput = document.getElementById(userInputs[i]);
            if (!validateData(userInputs[i], userInput.value)) {
                alert('Invalid user input.');
                return;
            }
        }
        //get values from what people type in and submit
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var phoneNumber = document.getElementById('phoneNumber').value;
        var email = document.getElementById('email').value;
        var websiteURL = document.getElementById('websiteURL').value;
        //put user info into string for display
        var userInfo = `Name: ${firstName} ${lastName}<br>
                        Phone Number: ${phoneNumber}<br>
                        Email: ${email}<br>
                        Website URL: ${websiteURL}`;
        //display the info in a box, create the box
        var userInfoBox = document.getElementById('userInfo');
        while (userInfoBox.firstChild) {
            userInfoBox.removeChild(userInfoBox.firstChild);
        }
        var p = document.createElement('p');
        p.textContent = `Name: ${firstName} ${lastName}\n
                 Phone Number: ${phoneNumber}\n
                 Email: ${email}\n
                 Website URL: ${websiteURL}`;

        userInfoBox.appendChild(p);

        userInfoBox.style.display = 'flex';

        userInfoBox.style.backgroundColor = 'lightblue';
        userInfoBox.style.border = '2px solid black';
        userInfoBox.style.padding = '10px';
        userInfoBox.style.margin = '20px';
        userInfoBox.style.fontSize = '20px';


        //make the badges appear but based on survey question answers from the person
        var question1 = document.getElementsByName('question1');
        var question2 = document.getElementsByName('question2');
        var choice1, choice2;

        for (var t = 0; t < question1.length; t++) {
            if (question1[t].checked) {
                choice1 = question1[t].value;
                break;
            }
        }

        for (var q = 0; q < question2.length; q++) {
            if (question2[q].checked) {
                choice2 = question2[q].value;
                break;
            }
        }
        //make those badges go in the box with the personal information
        if (!choice1 || !choice2) {
            alert('Please answer all the survey questions.');
            return;
        }
        var outputBadge = (choice1 === 'yes' && choice2 === 'very much') ? 'img/badge1.jpeg' : 'img/badge2.jpeg';
        var badgeBox1 = document.createElement('img');
        badgeBox1.src = outputBadge;
        badgeBox1.style.width = 'auto';
        badgeBox1.style.height = '500px';

        userInfoBox.appendChild(badgeBox1);
    });
});


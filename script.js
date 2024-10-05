//Input Fields
const firstname = document.getElementById("firstname")
const Surname = document.getElementById("Surname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const day = document.getElementById("day")
const month = document.getElementById("month")
const year = document.getElementById("year") 

const Female = document.getElementById("Female")
const Male = document.getElementById("Male")
const Custom = document.getElementById("Custom")

const dobIcon = document.getElementById("dobIcon")
const genderIcon = document.getElementById("genderIcon")
const fIcon = document.getElementById("fIcon")
const SIcon = document.getElementById("SIcon")
const EIcon = document.getElementById("EIcon")
const PIcon = document.getElementById("PIcon")


// Modals
const fnModal = document.getElementById("fnModal")
const snModal = document.getElementById("snModal")
const dateModal = document.getElementById("dateModal")
const emailModal = document.getElementById("emailModal")
const passModal = document.getElementById("passModal")
const genderModal = document.getElementById("genderModal")
const genderDiv = document.getElementById("genderDiv")

const dateDetailModal = document.getElementById("dateDetailModal")
const genderErrorModal = document.getElementById("genderErrorModal")

eventsCheck(firstname)
eventsCheck(Surname)
eventsCheck(email)
eventsCheck(password)

eventsCheck(day)
eventsCheck(month)
eventsCheck(year)



async function handleSignup() {
    function selectGender() {

        if (Female.checked) {
            return Female.value;
        } else if (Male.checked) {
            return Male.value;
        } else if (Custom.checked) {
            return Custom.value;
        } else {
            return null;
        }
    }
    const gender = selectGender()
    console.log(gender);
    
    console.log("In handle sign up");
    if(firstname.value === ''){
        modalFname()
        if (Surname.value === '') {
            Surname.parentElement.style.border = '2px solid red'
            SIcon.style.display = 'inline'
        }
        if (day.value === '' || month.value === ''|| year.value === '') {
            day.parentElement.style.border = '2px solid red'
            month.parentElement.style.border = '2px solid red'
            year.parentElement.style.border = '2px solid red'
            dobIcon.style.display = 'inline'
        }
        if(gender === ''){
            genderIcon.style.display = 'inline'
            genderDiv.style.border = '2px solid red'
        }
        if (email.value === '') {
            email.parentElement.style.border = '2px solid red'
            EIcon.style.display = 'inline'
        }
        if (password.value === '') {
            password.parentElement.style.border = '2px solid red'
            PIcon.style.display = 'inline'
        }
        return
    }
    if(Surname.value === ''){
        modalSname()
        if (day.value === '' || month.value === ''|| year.value === '') {
            day.parentElement.style.border = '2px solid red'
            month.parentElement.style.border = '2px solid red'
            year.parentElement.style.border = '2px solid red'
            dobIcon.style.display = 'inline'
        }
        if(gender === ''){
            genderIcon.style.display = 'inline'
            genderDiv.style.border = '2px solid red'
        }
        if (email.value === '') {
            email.parentElement.style.border = '2px solid red'
            EIcon.style.display = 'inline'
        }
        if (password.value === '') {
            password.parentElement.style.border = '2px solid red'
            PIcon.style.display = 'inline'
        }
        return
    }
    if (day.value === '' || month.value === ''|| year.value === '') {
        modalDate()
        if(gender === ''){
            genderIcon.style.display = 'inline'
            genderDiv.style.border = '2px solid red'
        }
        if (email.value === '') {
            email.parentElement.style.border = '2px solid red'
            EIcon.style.display = 'inline'
        }
        if (password.value === '') {
            password.parentElement.style.border = '2px solid red'
            PIcon.style.display = 'inline'
        }
        return
    }
    if(year.value < 1905 || year.value >= 2010){
        modalDate()
        return
    }
    if(gender === ''){
        modalGender()
        if (email.value === '') {
            email.parentElement.style.border = '2px solid red'
            EIcon.style.display = 'inline'
        }
        if (password.value === '') {
            password.parentElement.style.border = '2px solid red'
            PIcon.style.display = 'inline'
        }
        return
    }
    if (email.value === '') {
        modalEmail()
        if (password.value === '') {
            password.parentElement.style.border = '2px solid red'
            PIcon.style.display = 'inline'
        }
        return
    }
    if (password.value === '') {
        modalPass()
        return
    }


    try {
        const response = await fetch('http://localhost:5000/api/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Firstname: firstname.value,
                Surname: Surname.value,
                DateOfBirth: {
                    day: day.value,
                    month: month.value,
                    year: year.value
                },
                gender: gender,
                email: email.value,
                password: password.value
            })
        });
    
        const data = await response.json();
    
        if (data.message === "User added successfully") {
            showToast("Account Created Successfully");
        } else if (data.message === "User Already Exist") {
            showToast("User Already Exists");
        } else {
            showToast(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred while adding the user");
    }
    
}


function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    
    // Hide the toast after 3 seconds
    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}


function eventsCheck(Input) {
    Input.addEventListener('focus', () => {
        console.log("IAM IN FOCUS");

        if (Input.nextElementSibling=== null) {
            return
        }else{
            Input.nextElementSibling.style.display = "none";
        }
        Input.parentElement.style.border = 'none'
        
        if (Input === firstname) fnModal.style.display = 'none'
        else if(Input === Surname) snModal.style.display = 'none'
        else if(Input === day || Input === month || Input === year) dateModal.style.display = 'none' 
        else if(Input === email) emailModal.style.display = 'none'
        else if(Input === password) passModal.style.display = 'none'
    });
    
    Input.addEventListener('blur', () => {
        console.log("IAM IN Blur");
        toggleErrorIcon(Input);
    });
}


function toggleErrorIcon(input) {
    console.log("IAM IN TOGGLE INPUT ERROR");

    if(input === day||input === month || input=== year){
        console.log("IAM IN CHECK DOB IF");
        if(day === null||month === null||year === null){
            dobIcon.style.display = 'inline'
            input.parentElement.style.border = '2px solid red'
        }
        if (input.value === '') {
            dobIcon.style.display = 'inline'
            input.parentElement.style.border = '2px solid red'
        }else{
            dobIcon.style.display = 'none'
            dateModal.style.display = 'none'
            input.parentElement.style.border = 'none'
            return;
        }
    }

    const icon = input.nextElementSibling;
    if (input.value === '') {
        
        icon.style.display = "inline";
        input.parentElement.style.border = '2px solid red'
    } else {
        icon.style.display = "none";
        input.parentElement.style.border = 'none'
    }

}

function clickOnModal(Input) {
    Input.style.display = 'none'

    if(Input === passModal){
        password.parentElement.style.border = "2px solid red"
        password.nextElementSibling.style.display = 'inline'

    }else if(Input ===emailModal){
        email.parentElement.style.border = "2px solid red"
        email.nextElementSibling.style.display = 'inline'

    }else if(Input === snModal){
        SIcon.style.display = 'inline'
        SIcon.parentElement.style.border = '2px solid red'
    }else if(Input === dateModal){
        dobIcon.style.display = 'inline'
        day.parentElement.style.border = '2px solid red'
        month.parentElement.style.border = '2px solid red'
        year.parentElement.style.border = '2px solid red'
    }else if(Input === fnModal){
        fIcon.style.display = 'inline'
        fIcon.parentElement.style.border = '2px solid red'
    }
}


//Click on Error Icon
function modalFname() {
    fnModal.style.display = 'inline'
    fnModal.style.marginLeft = '30%'
    fnModal.style.marginTop = '12.6%'

    fIcon.style.display = 'none'
    firstname.parentElement.style.border = 'none'

    snModal.style.display = 'none'
    dateModal.style.display = 'none' 
    emailModal.style.display = 'none'
    passModal.style.display = 'none'
}
function modalSname() {
    snModal.style.display = 'inline'
    snModal.style.marginLeft = '62%'
    snModal.style.marginTop = '16.1%'

    SIcon.style.display = 'none'

    Surname.parentElement.style.border = 'none'

    fnModal.style.display = 'none'
    dateModal.style.display = 'none' 
    emailModal.style.display = 'none'
    passModal.style.display = 'none'
}
function modalDate() {
    dateModal.style.display = 'inline'
    dateModal.style.marginLeft = '16%'
    dateModal.style.marginTop = '20%'

    dobIcon.style.display = 'none'
    day.parentElement.style.border = 'none'
    month.parentElement.style.border = 'none'
    year.parentElement.style.border = 'none'

    fnModal.style.display = 'none'
    snModal.style.display = 'none'
    emailModal.style.display = 'none'
    passModal.style.display = 'none'
}
function modalEmail() {
    emailModal.style.display = 'inline'
    emailModal.style.marginLeft = '64%'
    emailModal.style.marginTop = '27%'

    EIcon.style.display = 'none'
    email.parentElement.style.border = 'none'

    fnModal.style.display = 'none'
    dateModal.style.display = 'none' 
    snModal.style.display = 'none'
    passModal.style.display = 'none'
}
function modalPass() {
    passModal.style.display = 'inline'
    passModal.style.marginLeft = '62%'
    passModal.style.marginTop = '30.1%'

    PIcon.style.display = 'none'
    password.parentElement.style.border = 'none'


    fnModal.style.display = 'none'
    dateModal.style.display = 'none' 
    snModal.style.display = 'none'
    emailModal.style.display = 'none'
}
function modalGender() {
    genderErrorModal.style.display = 'inline'
    genderErrorModal.style.marginLeft = '64%'
    genderErrorModal.style.marginTop = '30.35%'
}
function genderDetails() {
    genderModal.style.display = 'inline'
    genderModal.style.marginLeft = '13%'
    genderModal.style.marginTop = '20%'
    dateDetailModal.style.display = 'none'
}

function dateDetails() {
    dateDetailModal.style.display = 'inline'
    dateDetailModal.style.marginLeft = '13%'
    dateDetailModal.style.marginTop = '15%'
    genderModal.style.display = 'none'
}
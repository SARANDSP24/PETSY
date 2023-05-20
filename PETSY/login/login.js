import {state} from '../signup/sign_up.js';

const emailEl = document.getElementById("name1");
const passEl = document.getElementById("password");
const btn = document.getElementById("grad-btn");
const incorrect = document.querySelector(".spn");
const togglePassword = document.querySelector('#togglePassword');

console.log(state);
function init() {
    initListener();
}

// Submit Button Action
function initListener() {
    btn.addEventListener('click',(event)=>{
        event.preventDefault();
        validate();
    })
}

// Function to login in the user if he/she has account already
function validate() {
    if(emailEl.value === "" || passEl.value === "") {
        alert("Please enter the details")
    }
    else {
        for(let i=0; i<state.details.length;i++){
            if( state.details[i].ep === emailEl.value && state.details[i].password === passEl.value) {
                incorrect.classList.add("hide");
                console.log("Logged In");
                redirect();
                break;
            }
            else if (state.details[i].ep === emailEl.value && state.details[i].password !== passEl.value){
                incorrect.classList.remove("hide");
                break;
            }
            else {
                alert("Account doesn't exist");
                break;
            }
        }
    } 
}

// Redirect Function
function redirect() {
    let timeout = setInterval(function(){
        window.location.href = "../main/index.html";
        window.clearInterval(timeout);
    },10)
}

// Eye Button in password
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = passEl.getAttribute('type') === 'password' ? 'text' : 'password';
    passEl.setAttribute('type', type);
    // toggle the eye / eye slash icon
    this.classList.toggle('bi-eye');
});


init();


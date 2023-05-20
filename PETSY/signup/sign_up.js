const namef = document.getElementById("name1")
const namel = document.getElementById("name2")
const pass1 = document.getElementById("password")
const cpass = document.getElementById("cpassword")
const btn = document.getElementById("gradient-button")
const form1 = document.querySelector(".form_container")
const animation = document.querySelector(".created")
const container = document.querySelector(".container")
const eorph = document.getElementById("email_phone")
const timer = document.querySelector(".timer")
let count = 4
let countdown

let state={
    details:[]
}

function init(){
    let l_state = JSON.parse(localStorage.getItem('sign_up'));
    if(l_state!=null){
        state = l_state;
    }
    initListener();
}

function initListener(){
    if(btn){
        btn.addEventListener('click' ,(event)=>{
            event.preventDefault();
            update_values()
        })
    }
}

function update_state(){
    localStorage.setItem('sign_up',JSON.stringify(state));
    redirect();
}

// Redirect timer
function timerDisplay() {
    console.log("hello")
    countdown = setInterval(()=> {
        console.log("welcome")
        count--;
        timer.innerHTML = `${count}s`;
        if(count == 0) {
            clearInterval(countdown);
            let timeout = setInterval(function(){
                window.location.href = "../login/login.html";
                window.clearInterval(timeout);
            },1000)
        }
    },1000)
}

let seconds = 3
function redirect(){
    container.classList.add('fade');
    animation.classList.remove("fade");
    count = 4;
    clearInterval(countdown);
    timerDisplay();
}


function update_values(){
    let Name = namef.value+" "+namel.value;
    let pass = pass1.value;
    let c1pass = cpass.value;
    let email_or_phone = eorph.value;
    
    var pattern = /^[a-z ,.'-]+$/i;
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(pattern.test(namef.value)){
        if(eorph.value==''){
            alert("Enter a Valid Email or Phone Number");
        }
        else if(emailRegex.test(email_or_phone) || phoneRegex.test(email_or_phone)){
            if(check_email(email_or_phone)){
                if(pass==''||cpass=='' || !regularExpression.test(pass)){
                    alert("Enter a Valid Password");
                }
                else if(pass!=c1pass){
                    alert("Passwords do not match");
                }
                else{
                    const detail={
                        name:Name,
                        ep:eorph.value,
                        password:pass1.value
                    }
                    state.details.push(detail);
                    update_state();
                    namef.value ='';
                    namel.value='';
                    eorph.value='';
                    pass1.value='';
                    cpass.value='';
                }
            }
        }
        else{
            alert("Enter a Valid Email or Phone Number");
        } 
    }
    else{
        alert("Enter a Valid Name");
    }
}

/*Existence of email or phone Number verification*/
function check_email(e_p){
    for(let i=0;i<state.details.length;i++) {
        if(e_p === state.details[i].ep) {
            alert("User Already Exist");
            return false;
        }
    }
    return true;
}

init();
export {state};
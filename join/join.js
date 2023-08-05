const userNameInput = document.getElementById('name-input');
const userIDInput = document.getElementById('id-input');
const userPWInput = document.getElementById('pw-input');
const userPwCheckInput = document.getElementById('pw-check-input');
const inviteCodeInput = document.getElementById('invite-input');

const prevButton = document.getElementById('prev-button');
const joinForm = document.getElementById('join-form');
const errorMessages = document.getElementsByClassName('error-msg');

prevButton.onclick = () => {
    window.open('../login/login.html', '_top');
};

joinForm.addEventListener('submit', e => {
    e.preventDefault();

    const userName = userNameInput.value;
    const userID = userIDInput.value;
    const userPW = userPWInput.value;
    const userPwCheck = userPwCheckInput.value;
    const inviteCode = inviteCodeInput.value;

    if(userName.length === 0){
        errorMessages[0].style.visibility = "visible";
        return;
    }

    if(userID.length === 0){
        errorMessages[1].style.visibility = "visible";
        return;
    }

    if(userPW.length === 0){
        errorMessages[2].style.visibility = "visible";
        return;
    }

    if(userPW !== userPwCheck) {
        errorMessages[3].style.visibility = "visible";
        return;
    }

    if(inviteCode.length > 6) {
        errorMessages[4].style.visibility = "visible";
        return;
    }


    const data = {userID, userName, userPW, inviteCode};

    axios.post('http://192.168.10.192:8088/auth/user', data)
    .then(response => {
        if(response.data.statusMsg){
            console.log('성공');
            window.open('../login', '_top');
        }else{
            console.log('실패');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });


});


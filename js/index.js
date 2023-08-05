const headContainer = document.getElementsByClassName("info-container");

headContainer[0].addEventListener("click", ()=>{
    
});

// 라디오 버튼 요소들 가져오기
const radio1 = document.getElementById("info-radio1");
const radio2 = document.getElementById("info-radio2");
const radio3 = document.getElementById("info-radio3");

// 라디오 버튼 상태가 변경될 때 실행되는 함수
function handleRadioChange() {
    if (radio1.checked) {
        headContainer[0].classList.remove('invisible');
        headContainer[1].classList.add('invisible');
        headContainer[2].classList.add('invisible');
    } else if (radio2.checked) {
        headContainer[0].classList.add('invisible');
        headContainer[1].classList.remove('invisible');
        headContainer[2].classList.add('invisible');
    } else if (radio3.checked) {
        headContainer[0].classList.add('invisible');
        headContainer[1].classList.add('invisible');
        headContainer[2].classList.remove('invisible');
    }
}

// 라디오 버튼 상태 변경 이벤트에 함수 연결
radio1.addEventListener("change", handleRadioChange);
radio2.addEventListener("change", handleRadioChange);
radio3.addEventListener("change", handleRadioChange);

let radioIndex = 1;
setInterval(()=>{
    console.log('change');
    if(radioIndex === 0){
        radio1.click();
        radioIndex++;
    }else if(radioIndex === 1){
        radio2.click();
        radioIndex++;
    }else if(radioIndex === 2){
        radio3.click();
        radioIndex++;
    }else{
        radioIndex = 0;
    }
}, 3000);

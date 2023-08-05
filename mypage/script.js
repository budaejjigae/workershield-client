const infoButton = document.getElementById("info-btn");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-btn");

// 모달창 열기
infoButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// 모달창 닫기
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// 모달창 외부를 클릭해도 모달창 닫히도록 설정
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
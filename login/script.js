const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 폼 제출 동작 중지

  // 아이디와 비밀번호 입력값 가져오기
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // 간단한 예시: 입력된 아이디와 비밀번호를 콘솔에 출력합니다.
  console.log("아이디:", username);
  console.log("비밀번호:", password);

  // 여기에서 실제 로그인 처리를 수행하거나 서버로 전송하는 작업을 구현할 수 있습니다.
});

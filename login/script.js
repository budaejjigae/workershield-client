document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const userID = document.getElementById('username').value;
  const userPW = document.getElementById('password').value;

  const data = { userID, userPW };

  // 로그인 정보를 서버로 POST 요청으로 전송 (Axios 사용)
  axios.post('http://192.168.10.192:8088/auth/log', data)
    .then((response) => {
      if (response.data.statusMsg) {
        // 로그인 성공 메시지 표시
        console.log('성공');
        const accessToken = response.data.data; // 토큰 추출
        // 토큰을 원하는 방식으로 저장 (예: 로컬 스토리지에 저장)
        localStorage.setItem('accessToken', accessToken);
        console.log(accessToken)
        window.location.href = '/';
      } else {
        // 로그인 실패 메시지 표시
        console.log('실패');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
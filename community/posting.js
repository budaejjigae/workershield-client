// 토큰을 로컬 스토리지에서 가져오기
const accessToken = localStorage.getItem('accessToken');
console.log(accessToken);

// API 요청 헤더에 토큰 추가
const headers = {
    authorization: `Bearer ${accessToken}`
};

document.getElementById('upload-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const boardHead = document.getElementById('title').value;
    const boardContent = document.getElementById('content').value;
  
    const data = { boardHead, boardContent };
  
    axios.post('http://192.168.10.192:8088/commu', data, { headers })
      .then((response) => {
        if (response.data.statusMsg) {
          // 업로드 성공 메시지 표시
          console.log('성공');
          window.location.href = '/community';
        } else {
          // 업로드 실패 메시지 표시
          console.log('실패');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
/******* 캘린더 *******/
// 현재 날짜 가져오기
let today = new Date();

// 현재 월, 연도 가져오기
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// 달력 생성 함수
function generateCalendar(month, year) {
  let calendar = document.getElementById('calendar');
  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  let date = 1;
  let html = '<tr>';
  for (let i = 0; i < 7; i++) {
    if (i === firstDay) {
      break;
    }
    html += '<td></td>';
  }

  for (let i = 0; i < daysInMonth; i++) {
    if (date > daysInMonth) {
      break;
    }
    if (i !== 0 && (firstDay + i) % 7 === 0) {
      html += '</tr><tr>';
    }
    // 10일과 25일에 점 추가
    let dot = '';
    if (date === 10 && currentMonth === 7) {
      dot = '<span class="dot1"></span>';
    }
    if (date === 25 && currentMonth === 7) {
      dot = '<span class="dot2"></span>';
    }
    html += `<td>${date}${dot}</td>`;
    date++;
  }

  if (firstDay + daysInMonth <= 35) {
    while ((firstDay + daysInMonth) % 7 !== 0) {
      html += '<td></td>';
      daysInMonth++;
    }
  }

  html += '</tr>';
  calendar.innerHTML = html;

  document.getElementById('month').innerText = getMonthName(month);
}

// 월 이름 반환 함수
function getMonthName(month) {
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  return monthNames[month];
}

// 이전 달로 이동
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  onDateClick(0);
  generateCalendar(currentMonth, currentYear);
}

// 다음 달로 이동
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  onDateClick(0);
  generateCalendar(currentMonth, currentYear);
}

// 초기 달력 생성
generateCalendar(currentMonth, currentYear);
/******* 날짜 클릭 *******/

// 날짜 클릭 이벤트 처리 함수
function onDateClick(date) {
  const eventContainer = document.getElementById('event-container');
  let eventContent = '';

  // 이벤트를 가져오기
  switch (date) {
    case 10:
      eventContent = `
      <div class="event">
          <div class="color"></div>
          <div class="content">
              <div class="date">08.10</div>
              <div class="title">
                  안전모 점검일
              </div>
          </div>
      </div>
      `;
      break;
    case 25:
      eventContent = `
      <div class="event">
          <div class="color"></div>
          <div class="content">
              <div class="date">08.25</div>
              <div class="title">
                  사내 안전 교육
              </div>
          </div>
      </div>
      `;
      break;
    default:
      eventContent = '';
      break;
  }

  // 이벤트 내용을 추가
  eventContainer.innerHTML = eventContent;
}

// 달력 날짜 클릭 이벤트 리스너 등록
document.getElementById('calendar').addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'TD') {
        const date = parseInt(target.innerText);
        if (!isNaN(date)) {
            onDateClick(date);
        }
    }
});
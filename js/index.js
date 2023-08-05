const headContainer = document.getElementsByClassName("info-container");

headContainer[0].addEventListener("click", ()=>{
    radio2.click();
});

headContainer[1].addEventListener("click", ()=>{
    radio3.click();
});

headContainer[2].addEventListener("click", ()=>{
    radio1.click();
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

// 토큰을 로컬 스토리지에서 가져오기
const accessToken = localStorage.getItem('accessToken');

// API 요청 헤더에 토큰 추가
const headers = {
    Authorization: `Bearer ${accessToken}`
};

// 게시글 목록을 가져오는 함수
async function fetchPosts(pageId) {
    try {
        const response = await axios.get(`http://192.168.10.192:8088/commu/page/${pageId}`, { headers });
        const { data, totalPosts } = response.data; // 응답 데이터에서 필요한 정보 추출
        console.log('d: ', data);
        console.log('t:', totalPosts);
    
        // 필요한 정보를 가공하여 배열 형태로 반환
        const posts = data.map(item => ({
            id: item.boardID,
            author: item.boardWriter,
            title: item.boardHead,
            content: item.boardContent,
            views: item.boardView,
            comments: item.boardComment,
        }));
    
        return { posts, totalPosts }; // 가져온 게시글 목록과 총 게시글 수 반환
        } catch (error) {
        console.error('Error fetching posts:', error);
        return { posts: [], totalPosts: 0 }; // 에러가 발생하면 빈 배열과 0을 반환
        }
    } 

    async function displayPosts(pageNumber) {
        // 게시글 목록 가져오기
        const { posts } = await fetchPosts(pageNumber); // fetchPosts 함수 수정 후 반환값 변경
    
        const container = document.getElementsByClassName("posts")[0];
        container.innerHTML = ""; // 기존 게시물 삭제

        let i = 0; 
        posts.forEach((post) => {
            const postHTML = `
            <div class="post-container">
                <a class="post" href="../community/post.html?id=${post.id}">
                    <div class="post-title">
                        ${post.title}
                    </div>
                    <div class="icons">
                        <div class="view-container">
                            <box-icon type='solid' name='show' color="#6a6a6a" size="18px"></box-icon>
                            <div class="view-data">
                                ${post.views}
                            </div>
                        </div>
                        <div class="comment-container">
                            <box-icon type='solid' name='comment' color="#6a6a6a" size="14px"></box-icon>
                            <div class="comment-data">
                                ${post.comments}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            `;
            
            container.innerHTML += postHTML;    
        });
}
async function initializePage() {
    const currentPage = 1;

    displayPosts(currentPage); // 첫 번째 페이지 게시물 표시
}  

initializePage();

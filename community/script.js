/******* 페이징 *******/
const postsPerPage = 10; // 한 페이지당 보여줄 게시물 수

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
      console.log('t:', totalPosts)
  
      // 필요한 정보를 가공하여 배열 형태로 반환
      const posts = data.map(item => ({
        author: item.boardWriter,
        title: item.boardHead,
        content: item.boardContent,
        views: item.boardView,
        comments: item.boardComment,
        id: item.boardID
      }));
  
      return { posts, totalPosts }; // 가져온 게시글 목록과 총 게시글 수 반환
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { posts: [], totalPosts: 0 }; // 에러가 발생하면 빈 배열과 0을 반환
    }
  } 

  async function displayPosts(pageNumber) {
    const startIndex = (pageNumber - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    // 게시글 목록 가져오기
    const { posts } = await fetchPosts(pageNumber); // fetchPosts 함수 수정 후 반환값 변경
  
    const container = document.getElementById("posts-container");
    container.innerHTML = ""; // 기존 게시물 삭제

    posts.forEach((post) => {
        const postHTML = `
            <a class="post" href="./post.html?id=${post.id}">
                <div class="author">${post.author}</div>
                <div class="title">${post.title}</div>
                <div class="content">${post.content}</div>
                <div class="bottom-menu">
                    <box-icon name='show'></box-icon>
                    <div class="views">${post.views}</div>
                    <box-icon name='comment' size="20px"></box-icon>
                    <div class="comments">${post.comments}</div>
                </div>
            </a>
        `;
        container.innerHTML += postHTML;
    });
}

function updatePaginationButtons(currentPage, totalPages) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // 기존 페이징 버튼 삭제

    // 이전 페이지 버튼
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "<box-icon name='caret-left' color='var(--main)'></box-icon>";
    prevButton.disabled = currentPage === 1;
    prevButton.classList.add("pagination-button", "prev-btn");
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            displayPosts(currentPage - 1);
            updatePaginationButtons(currentPage - 1, totalPages);
        }
    });
    pagination.appendChild(prevButton);

    // 숫자 버튼
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.disabled = i === currentPage;
        button.classList.add("pagination-button", i === currentPage ? "active" : "page-btn");
        button.addEventListener("click", () => {
            displayPosts(i);
            updatePaginationButtons(i, totalPages);
        });
        pagination.appendChild(button);
    }

    // 다음 페이지 버튼
    const nextButton = document.createElement("button");
    nextButton.innerHTML = "<box-icon name='caret-right' color='var(--main)'></box-icon>";
    nextButton.disabled = currentPage === totalPages;
    nextButton.classList.add("pagination-button", "next-btn");
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            displayPosts(currentPage + 1);
            updatePaginationButtons(currentPage + 1, totalPages);
        }
    });
    pagination.appendChild(nextButton);
}


// 페이지 수 계산
async function calculateTotalPages(pageId) {
    return Math.ceil(3 / 2);
}  

async function initializePage() {
    const currentPage = 1;
    const totalPages = await calculateTotalPages(currentPage); // 페이지 수 계산
  
    displayPosts(currentPage); // 첫 번째 페이지 게시물 표시
    updatePaginationButtons(currentPage, totalPages); // 페이징 버튼 표시
  }  
  
initializePage();
/******* 페이징 버튼 위치 조정 *******/
// 스크롤 여부를 감지하는 함수
function hasVerticalScrollbar() {
    return document.body.scrollHeight > window.innerHeight;
}

// board-container의 height를 동적으로 조절하는 함수
function adjustBoardContainerHeight() {
    const boardContainer = document.getElementById("posts-container");
    if (hasVerticalScrollbar()) {
        boardContainer.style.height = "auto"; // 스크롤이 있으면 height를 자동으로 설정
    } else {
        boardContainer.style.height = "645px"; // 스크롤이 없으면 height를 600px로 설정
        boardContainer.style.overflowY = "auto"; // 스크롤이 없는 경우 overflowY를 hidden으로 설정하여 스크롤바 숨김
    }
}

// 페이지 로드 시 한 번 호출하여 초기 설정
adjustBoardContainerHeight();

// 스크롤 이벤트를 감지하여 스크롤이 발생할 때마다 height 조절
window.addEventListener("scroll", adjustBoardContainerHeight);



const container = document.getElementById("board-container");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");

// 검색 버튼을 클릭하거나 검색어 입력창에서 엔터를 누를 때 검색을 수행합니다.
searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        performSearch();
    }
});

// 검색 기능을 수행하는 함수입니다.
function performSearch() {
    const searchKeyword = searchInput.value.trim().toLowerCase();

    if (searchKeyword === "") {
        // 검색어가 없는 경우 모든 게시글을 다시 표시합니다.
        renderPosts(posts);
        return;
    }

    // 검색 결과를 백엔드에 요청하고 받아온 데이터를 사용합니다.
    // 백엔드에서는 검색어와 관련된 데이터를 전달합니다.
    axios.get(`http://192.168.10.192:8088/commu/search/?searchWord=${searchKeyword}`, { headers })
        .then((response) => {
            const searchResults = response.data;
            renderSearchResults(searchResults);
        })
        .catch((error) => {
            console.error("Error fetching search results:", error);
        });
}

// 검색 결과를 화면에 표시하는 함수입니다.
function renderSearchResults(searchResults) {
    // 기존에 표시되어있는 검색 결과를 모두 지웁니다.
    container.innerHTML = "";

    searchResults.forEach((result) => {
        const row = document.createElement("div");
        row.innerHTML = `
        <a class="post" href="./post.html?id=${result.id}">
            <div class="author">${result.author}</div>
            <div class="title">${result.title}</div>
            <div class="content">${result.content}</div>
            <div class="bottom-menu">
                <box-icon name='show'></box-icon>
                <div class="views">${result.views}</div>
                <box-icon name='comment' size="20px"></box-icon>
                <div class="comments">${result.comments}</div>
            </div>
        </a>
        `;
        container.appendChild(row);
    });
}

function renderPosts(postsToRender) {
    container.innerHTML = "";

    postsToRender.forEach((post) => {
        const row = document.createElement("div");
        row.innerHTML = `
        <a class="post" href="./post.html?id=${result.id}">
            <div class="author">${result.author}</div>
            <div class="title">${result.title}</div>
            <div class="content">${result.content}</div>
            <div class="bottom-menu">
                <box-icon name='show'></box-icon>
                <div class="views">${result.views}</div>
                <box-icon name='comment' size="20px"></box-icon>
                <div class="comments">${result.comments}</div>
            </div>
        </a>
        `;
        container.appendChild(row);
    });
}
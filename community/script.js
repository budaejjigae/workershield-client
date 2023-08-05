/******* 페이징 *******/
const postsPerPage = 10; // 한 페이지당 보여줄 게시물 수
const posts = [
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
    {
        title: 'hi',
        author: 'yo',
        content: 'dasdsadasdsadasdasdasdasdsadas',
        views: 37,
        comments: 12
    },
]; // 게시물 데이터

function displayPosts(pageNumber) {
    const startIndex = (pageNumber - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = posts.slice(startIndex, endIndex);

    const container = document.getElementById("posts-container");
    container.innerHTML = ""; // 기존 게시물 삭제

    postsToShow.forEach((post) => {
        const postHTML = `
            <a class="post" href="./post.html">
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
const totalPages = Math.ceil(posts.length / postsPerPage);
const currentPage = 1;
displayPosts(currentPage); // 첫 번째 페이지 게시물 표시
updatePaginationButtons(currentPage, totalPages); // 페이징 버튼 표시

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
        boardContainer.style.overflowY = "hidden"; // 스크롤이 없는 경우 overflowY를 hidden으로 설정하여 스크롤바 숨김
    }
}

// 페이지 로드 시 한 번 호출하여 초기 설정
adjustBoardContainerHeight();

// 스크롤 이벤트를 감지하여 스크롤이 발생할 때마다 height 조절
window.addEventListener("scroll", adjustBoardContainerHeight);
// 토큰을 로컬 스토리지에서 가져오기
const accessToken = localStorage.getItem('accessToken');

// API 요청 헤더에 토큰 추가
const headers = {
  Authorization: `Bearer ${accessToken}`
};

document.addEventListener("DOMContentLoaded", async () => {
    const postId = new URLSearchParams(window.location.search).get("id");
    const postContainer = document.getElementById("post-container");

    // Assuming you have a function to fetch the post data based on the postId.
    const postData = await fetchPostData(postId); // Replace 'fetchPostData' with your actual function.

    // Assuming 'postData' is an object containing post information.
    if (postData) {
        const post = postData.data.board;
        console.log(post)

        document.getElementById("author").textContent = post.boardWriter;
        document.getElementById("title").textContent = post.boardHead;
        document.getElementById("content").textContent = post.boardContent;
    } else {
        postContainer.innerHTML = "<p>Post not found.</p>";
    }

    // 댓글 정보 불러오기
    fetchComments(postId);

    // 댓글 작성 버튼 클릭 이벤트 처리
    const submitButton = document.getElementById("submit-comment");
    submitButton.addEventListener("click", () => {
        const contentInput = document.getElementById("comment-content");
        const content = contentInput.value;

        if (!content) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

        // 댓글 작성 함수 호출
        createComment(postId, content);

        // 작성된 댓글 화면에 추가 (이 부분은 fetchComments 함수 호출 후에 댓글 목록을 갱신하여 처리하는 것이 좋습니다)
        const commentContainer = document.querySelector(".comment-container");
        const commentHTML = `
            <div class="comment">
                <div class="author">${author}</div>
                <div class="content">${content}</div>
                <div class="date">${getCurrentDate()}</div>
            </div>
        `;
        commentContainer.innerHTML += commentHTML;

        // 댓글 입력 폼 초기화
        contentInput.value = "";
    });
});

async function fetchPostData(postId) {
    return await axios
        .get(`http://192.168.10.192:8088/commu/board/${postId}`, { headers })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching post data:", error);
            return null;
        });
}

// 댓글 정보 불러오기
function fetchComments(postId) {
    axios.get(`http://192.168.10.192:8088/commu/board/${postId}/comment`, { headers })
        .then((response) => {
            const comments = response.data.data;
            const commentContainer = document.querySelector(".comment-container");
            let commentHTML = "";


            comments.forEach((comment) => {
                commentHTML += `
                    <div class="comment">
                        <div class="author">${comment.commentWriter}</div>
                        <div class="content">${comment.commentContent}</div>
                        <div class="date">${comment.commentDate}</div>
                    </div>
                `;
            });

            commentContainer.innerHTML = commentHTML;
        })
        .catch((error) => {
            console.error("Error fetching comments:", error);
        });
}

/*
// 댓글 작성하기
function createComment(postId, content) {
    axios.post(`http://192.168.10.192:8088/commu/board/${postId}`, {
        content: content
    }, { headers })
    .then((response) => {
        console.log("Comment created successfully:", response.data);
    })
    .catch((error) => {
        console.error("Error creating comment:", error);
    });
}
*/
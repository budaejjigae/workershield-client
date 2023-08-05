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
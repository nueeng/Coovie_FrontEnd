// 글작성에 사용할 토큰
const token = localStorage.getItem("access")

// Movie API
async function getMovies() {
    const response = await fetch(`${backend_base_url}/main/`)


    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}

// Review GET API
async function getReviews() {
    const response = await fetch(`${backend_base_url}/reviews/`)


    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}

// Review POST API
async function postReview(id) {
    // 이미지파일이 있으면 JSON 통신이 아닌 FormData를 이용해야합니다
    movie = await getMovies() // await를 붙여야만 하는 이유가 궁금하다

    let content = document.getElementById(`movie-content-${id}`).value;
    let rating = document.getElementById(`movie-rating-${id}`).value;

    let response = await fetch(`${backend_base_url}/reviews/${id}/`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
            "content": content,
            "rating": rating
        })
    });

    if (response.status == 201) {
        alert("리뷰가 작성되었습니다.")
        window.location.replace(`${frontend_base_url}/review.html`)
        // 새로고침 후 스크롤이 이동되었으면 좋겠는데.. 실패
        document.getElementById(`movie-content-${id}`).scrollIntoView();
    } else {
        console.log(response)
        // validation을 원래 따로 다 이렇게?? 백엔드에서 해놓은건 의미가 없나?
        alert(response.status)
    }
}

// 후기 Read 함수
async function getMypageReviews() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload);
    const user_id = payload_parse.user_id;

    const response = await fetch(`${backend_base_url}/users/mypage/${user_id}/`, {
        headers: { "Authorization": "Bearer " + localStorage.getItem("access") }
    });

    if (response.status == 200) {
        const response_json = await response.json();
        return response_json;
    } else {
        alert("불러오는데 실패했습니다.");
    }
}

// 영화 랜덤 추천 함수

async function getRandomMovies(movies, count){
    const shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

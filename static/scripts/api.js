const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"
const token = localStorage.getItem("access")
// URL에서 쿼리 파라미터 추출
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pageId = urlParams.get('page');

// movieId 쿼리 파라미터 값 가져오기
const movieId = urlParams.get('movieId');

async function getPaginatedMovies() {
    const response = await fetch(`${backend_base_url}/movie/?page=${pageId}`)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}

// Signin 함수
async function handleSignin() {
    const user_name = document.getElementById("user_name").value
    const password = document.getElementById("password").value

    const response = await fetch(`${backend_base_url}/users/sign-in/`, {
        headers: {
            "content-type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
            "user_name": user_name,
            "password": password
        })
    })

    return response
}

// Signup 함수
async function handleSignup() {
    const user_name = document.getElementById("user_name").value
    const password = document.getElementById("password").value
    const re_password = document.getElementById("re_password").value
    const email = document.getElementById("email").value

    const response = await fetch(`${backend_base_url}/users/sign-up/`, {
        headers: {
            "content-type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
            "user_name": user_name,
            "email": email,
            "password": password,
            "re_password": re_password
        })
    })
    return response
}

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

// async function getPaginatedMovies(page) {
//     const response = await fetch(`${backend_base_url}/movie/?page=${page}`)

//     if (response.status == 200) {
//         const response_json = await response.json()
//         return response_json
//     } else {
//         alert("불러오는데 실패했습니다.")
//     }
// }

// Review GET API
async function getReviewPageReviews() {
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

    let content = document.getElementById(`movie-content-${id}`).value;
    let rating = document.getElementById(`movie-rating-${id}`).value;

    // 이미지파일이 있으면 JSON 통신이 아닌 FormData를 이용해야합니다
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
        // validation을 원래 따로 다 이렇게?? 백엔드에서 해놓은건 의미가 없나?
        alert(response.status)
    }
}

// mypage 후기 GET 함수
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
async function getRandomMovies(movies, count) {
    const shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 추천 영화 호출 함수
async function handleLoadEvent() {
    const response = await fetch(`${backend_base_url}/recommendation/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            target_movie_id: movieId,
        }),
    });

    const response_json = await response.json();
    // response_json 활용
    return response_json
}

// 선택한 영화 호출 함수
async function getSelectedMovie() {
    const response = await fetch(`${backend_base_url}/recommendation/${movieId}/`)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}

function checkSignin() {
    const payload = localStorage.getItem("payload");
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
    };
}
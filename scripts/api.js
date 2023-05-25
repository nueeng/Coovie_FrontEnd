const token = localStorage.getItem("access")

async function getMovies() {
    const response = await fetch(`${backend_base_url}/main/`)


    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}

async function getReviews() {
    const response = await fetch(`${backend_base_url}/reviews/`)


    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}

async function postReview() {
    console.log("버튼눌림")
    movie = await getMovies()
    // 여러 리뷰를 쓰게되면 가변이니까 let으로..?
    let content = document.querySelector(`movie-content-${movie.id}`).value
    let rating = document.querySelector(`#movie-rating-${movie.id}`).value

    let response = await fetch(`${backend_base_url}/reviews/${movie.id}/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "content": content,
            "rating": rating
        })
    })
    console.log(response)
    return response
}

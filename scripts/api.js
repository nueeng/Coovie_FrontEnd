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
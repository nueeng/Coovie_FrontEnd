const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

// 비슷한 영화 데이터 가져오기
const fetchSimilarMovies = async () => {
    try {
        const response = await fetch(`${backend_base_url}/recommendation/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                target_movie_id: movieId
            })
        });

        if (response.ok) {
            const similarMovies = await response.json();
            similarMovies.forEach(movie => {
                const MovieImg = document.createElement("img");
                MovieImg.setAttribute("class", "card-img-top");
                
            })
        } else {
            console.error('Failed to fetch similar movies:', response.status);
        }
    } catch (error) {
        console.error('Error while fetching similar movies:', error);
    }
};

// 페이지 로드 시 비슷한 영화 데이터 가져오기
fetchSimilarMovies();
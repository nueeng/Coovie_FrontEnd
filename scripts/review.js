console.log('연결')

window.addEventListener('load', async function () {
    movies = await getMovies()
    console.log(movies)

    const movie_list = document.getElementById("review-movie")
    movies.forEach(movie => {
        // 카드 이미지
        const newMovieImg = document.createElement("img")
        newMovieImg.setAttribute("src", movie.poster_path)
        newMovieImg.setAttribute("class", "card-img-top")
        newMovieImg.setAttribute("alt", "")
        // 카드 바디
        const newMovieCardBody = document.createElement("div")
        newMovieCardBody.setAttribute("class", "card-body")
        // 카드 제목
        const newMovieTitle = document.createElement("h5")
        newMovieTitle.setAttribute("class", "card-title")
        newMovieTitle.innerHTML = movie.title
        // 카드 내용
        const newMovieOverview = document.createElement("p")
        newMovieOverview.setAttribute("class", "card-text")
        newMovieOverview.innerHTML = movie.overview
        // ul 리스트
        const newMovieUl = document.createElement("ul")
        newMovieUl.setAttribute("class", "list-group list-group-flush")
        // li 개봉일
        const newMovieRelease = document.createElement("li")
        newMovieRelease.setAttribute("class", "list-group-item")
        newMovieRelease.innerHTML = movie.release_date
        // li 장르
        const newMovieGenre = document.createElement("li")
        newMovieGenre.setAttribute("class", "list-group-item")
        newMovieGenre.innerHTML = movie.genre
        // li 평점
        const newMovieVote = document.createElement("li")
        newMovieVote.setAttribute("class", "list-group-item")
        newMovieVote.innerHTML = movie.vote_average

        movie_list.appendChild(newMovieImg)
        movie_list.appendChild(newMovieCardBody)
        movie_list.appendChild(newMovieTitle)
        movie_list.appendChild(newMovieOverview)
        movie_list.appendChild(newMovieUl)
        movie_list.appendChild(newMovieRelease)
        movie_list.appendChild(newMovieGenre)
        movie_list.appendChild(newMovieVote)

    }

    );
});

window.addEventListener('load', async function () {

    reviews = await getReviews()
    console.log(reviews)
});

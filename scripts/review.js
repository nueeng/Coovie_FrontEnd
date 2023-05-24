// console.log('연결')

// window.addEventListener('load', async function () {
//     movies = await getMovies()
//     console.log(movies)

//     const movie_list = document.getElementById("review-movie")
//     movies.forEach(movie => {
//         // 카드 이미지
//         const newMovieImg = document.createElement("img")
//         newMovieImg.setAttribute("class", "card-img-top")
//         newMovieImg.setAttribute("alt", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg")
//         if (movie.poster_path) {
//             newMovieImg.setAttribute("src", movie.poster_path)
//         } else {
//             newMovieImg.setAttribute("src", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg")
//         }
//         // 카드
//         const newCol = document.createElement("div")
//         newCol.setAttribute("class", "card")
//         // 카드 바디
//         const newMovieCardBody = document.createElement("div")
//         newMovieCardBody.setAttribute("class", "card-body")
//         // 카드 제목
//         const newMovieTitle = document.createElement("h5")
//         newMovieTitle.setAttribute("class", "card-title")
//         newMovieTitle.innerHTML = movie.title
//         // 카드 내용
//         const newMovieOverview = document.createElement("p")
//         newMovieOverview.setAttribute("class", "card-text")
//         newMovieOverview.innerHTML = movie.overview
//         // ul 리스트
//         const newMovieUl = document.createElement("ul")
//         newMovieUl.setAttribute("class", "list-group list-group-flush")
//         // li 개봉일
//         const newMovieRelease = document.createElement("li")
//         newMovieRelease.setAttribute("class", "list-group-item")
//         newMovieRelease.innerHTML = movie.release_date
//         // li 장르
//         const newMovieGenre = document.createElement("li")
//         newMovieGenre.setAttribute("class", "list-group-item")
//         newMovieGenre.innerHTML = movie.genre
//         // li 평점
//         const newMovieVote = document.createElement("li")
//         newMovieVote.setAttribute("class", "list-group-item")
//         newMovieVote.innerHTML = movie.vote_average
//         // 수평선
//         const newMovieLine = document.createElement("hr")

//         newCol.appendChild(newMovieImg)
//         newCol.appendChild(newMovieCardBody)
//         newMovieCardBody.appendChild(newMovieTitle)
//         newMovieCardBody.appendChild(newMovieOverview)
//         newCol.appendChild(newMovieUl)
//         newMovieUl.appendChild(newMovieRelease)
//         newMovieUl.appendChild(newMovieGenre)
//         newMovieUl.appendChild(newMovieVote)

//         movie_list.appendChild(newCol)
//         movie_list.appendChild(newMovieLine)


//     });
//     // 밖에 hr 주려다 실패한 코드
//     // const review_container = document.getElementById("review-container")
//     // const newMovieLine = document.createElement("hr")
//     // review_container.appendChild(newMovieLine)
// });

window.addEventListener('load', async function () {

    reviews = await getReviews()
    console.log(reviews)

    const movie_list = document.getElementById("review-movie")
    reviews.forEach(review => {
        // 카드 이미지
        const newMovieImg = document.createElement("img")
        newMovieImg.setAttribute("class", "card-img-top")
        newMovieImg.setAttribute("alt", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg")
        if (review.movie[5]) {
            newMovieImg.setAttribute("src", review.movie[5])
        } else {
            newMovieImg.setAttribute("src", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg")
        }
        // 카드
        const newCol = document.createElement("div")
        newCol.setAttribute("class", "card")
        // 카드 바디
        const newMovieCardBody = document.createElement("div")
        newMovieCardBody.setAttribute("class", "card-body")
        // 카드 제목
        const newMovieTitle = document.createElement("h5")
        newMovieTitle.setAttribute("class", "card-title")
        newMovieTitle.innerHTML = review.movie[1]
        // 카드 내용
        const newMovieOverview = document.createElement("p")
        newMovieOverview.setAttribute("class", "card-text")
        newMovieOverview.innerHTML = review.movie[2]
        // ul 리스트
        const newMovieUl = document.createElement("ul")
        newMovieUl.setAttribute("class", "list-group list-group-flush")
        // li 개봉일
        const newMovieRelease = document.createElement("li")
        newMovieRelease.setAttribute("class", "list-group-item")
        newMovieRelease.innerHTML = review.movie[3]
        // li 장르
        const newMovieGenre = document.createElement("li")
        newMovieGenre.setAttribute("class", "list-group-item")
        newMovieGenre.innerHTML = review.movie.genre
        // li 평점
        const newMovieVote = document.createElement("li")
        newMovieVote.setAttribute("class", "list-group-item")
        newMovieVote.innerHTML = review.movie[4]
        // 수평선
        const newMovieLine = document.createElement("hr")

        newCol.appendChild(newMovieImg)
        newCol.appendChild(newMovieCardBody)
        newMovieCardBody.appendChild(newMovieTitle)
        newMovieCardBody.appendChild(newMovieOverview)
        newCol.appendChild(newMovieUl)
        newMovieUl.appendChild(newMovieRelease)
        newMovieUl.appendChild(newMovieGenre)
        newMovieUl.appendChild(newMovieVote)

        movie_list.appendChild(newCol)
        movie_list.appendChild(newMovieLine)


    });

    // 페이지네이션을 해야하나?
    const review_list = document.getElementById("review-content")

    reviews.forEach(review => {
        // 리뷰 박스
        const newReviewDiv = document.createElement("div")
        newReviewDiv.setAttribute("class", "")
        // 리뷰 컨텐츠
        const newReviewContnet = document.createElement("p")
        newReviewContnet.innerHTML = review.content
        // 리뷰 작성자
        const newReviewUser = document.createElement("p")
        newReviewUser.innerHTML = review.user
        // 리뷰 평점 -> 별로 표기 연구
        const newReviewRating = document.createElement("p")
        newReviewRating.innerHTML = review.rating
        // 리뷰 좋아요 -> backend에서 누른 유저가 아닌 like된 수 띄워올 수 있도록 변경요망
        const newReviewLike = document.createElement("p")
        newReviewLike.innerHTML = review.like

        newReviewDiv.appendChild(newReviewContnet)
        newReviewDiv.appendChild(newReviewUser)
        newReviewDiv.appendChild(newReviewRating)
        newReviewDiv.appendChild(newReviewLike)

        review_list.appendChild(newReviewDiv)

    });
});

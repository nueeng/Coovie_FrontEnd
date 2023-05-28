window.addEventListener('load', async function getRecentReviews() {
    const recent_reviews = await getReviewPageReviews()
    const recent_movies = await getMovies()
    console.log(recent_reviews)
    const sorted_reviews =  recent_reviews.sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateB - dateA
    })
    const recentReviews = sorted_reviews.slice(0,5);
    console.log(recentReviews)
    const review_movies = document.getElementById("review-movies")

    recentReviews.forEach((review) => {
        const movieTitle = review.movie[1];
        const movieImage = review.movie[5];

        const movieCard = document.createElement("div");
        movieCard.setAttribute("class", "card col-2");
        movieCard.style.width = "300px";
        movieCard.style.height = "400px";

        const movieImageElement = document.createElement("img");
        movieImageElement.setAttribute("class", "card-img-top");
        movieImageElement.setAttribute("src", movieImage);

        const movieTitleElement = document.createElement("h5");
        // movieTitleElement.textContent = movieTitle;
        // movieTitleElement.classList.add("card-title");
        // movieTitleElement.style.textAlign = "center";
        movieTitleElement.setAttribute("class", "card-title");
        movieTitleElement.style.textAlign = "center"; // 가운데 정렬 설정
        movieTitleElement.innerHTML = movieTitle;

        movieCard.appendChild(movieImageElement);
        movieCard.appendChild(movieTitleElement);

        review_movies.appendChild(movieCard);

        movieCard.addEventListener("click", function (){
            const movieId = review.movie[0];
            const detailPageUrl = `${frontend_base_url}/recommend.html?movieId=${movieId}`;
            window.location.href = detailPageUrl;
        });

        movieCard.addEventListener("mouseover", function () {
            movieCard.style.transform = "scale(1.05)";
            movieCard.style.transition = "transform 0.3s";
        });

        movieCard.addEventListener("mouseout", function () {
            movieCard.style.transform = "scale(1)";
            movieCard.style.transition = "transform 0.3s";
        });
    });
    
});
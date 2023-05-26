window.addEventListener('load', async function () {
    movies = await getPaginatedMovies(page)
    reviews = await getReviews()

    console.log(movies)
    console.log(reviews)

    const movie_list = document.getElementById("review-movie");

    // Pagination 하면서 response가 object의 results속성에 영화가 담기는거로 바뀌어서 .results 추가
    movies.results.forEach(movie => {
        // 카드 이미지
        const newMovieImg = document.createElement("img");
        newMovieImg.setAttribute("class", "card-img-top");
        newMovieImg.setAttribute("alt", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg");
        if (movie.poster_path) {
            newMovieImg.setAttribute("src", movie.poster_path);
        } else {
            newMovieImg.setAttribute("src", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg");
        }
        // Movie 카드 로우
        const newMovieRow = document.createElement("div");
        newMovieRow.setAttribute("class", "row");
        newMovieRow.style.margin = "0px";
        // Movie 카드
        const newMovieCard = document.createElement("div");
        newMovieCard.setAttribute("class", "card col-3");
        newMovieCard.style.padding = "0";
        // Movie 카드 바디
        const newMovieCardBody = document.createElement("div");
        newMovieCardBody.setAttribute("class", "card-body");
        // Movie 카드 제목
        const newMovieTitle = document.createElement("h4");
        newMovieTitle.setAttribute("class", "card-title");
        newMovieTitle.innerHTML = movie.title;
        // Movie 카드 줄거리
        const newMovieOverview = document.createElement("p");
        newMovieOverview.setAttribute("class", "card-text");
        newMovieOverview.innerHTML = movie.overview;
        // 너무 길면 자르기 의논
        newMovieOverview.innerHTML = newMovieOverview.innerHTML.substring(0, 150);
        if (newMovieOverview.innerHTML.length >= 150) {
            newMovieOverview.innerHTML += "...";
        }
        // Movie ul 리스트
        const newMovieUl = document.createElement("ul");
        newMovieUl.setAttribute("class", "list-group list-group-flush");
        // Movie li 개봉일
        const newMovieRelease = document.createElement("li");
        newMovieRelease.setAttribute("class", "list-group-item");
        newMovieRelease.innerHTML = `개봉일 : ${movie.release_date}`;
        // Movie li 장르
        const newMovieGenre = document.createElement("li");
        newMovieGenre.setAttribute("class", "list-group-item");
        for (genre = 0; genre < movie.genres.length; genre++) {
            newMovieGenre.innerHTML += `${movie.genres[genre]}, `;
        }
        // replace() 메서드가 문자열을 수정하는 것이 아니라 새로운 문자열을 반환하기 때문에 =로 지정해줘야한다.
        newMovieGenre.innerHTML = newMovieGenre.innerHTML.replace(/,\s*$/, "");
        // Movie li 평점
        const newMovieVote = document.createElement("li");
        newMovieVote.setAttribute("class", "list-group-item");
        newMovieVote.innerHTML = `전문가평점 : ${movie.vote_average}`;
        // Movie 수평선
        const newMovieLine = document.createElement("hr");

        // 리뷰 컨테이너
        const newReviewCol = document.createElement("div");
        newReviewCol.setAttribute("class", "col");
        newReviewCol.style.marginLeft = "25px";


        newMovieRow.appendChild(newMovieCard);
        newMovieCard.appendChild(newMovieImg);
        newMovieCard.appendChild(newMovieCardBody);
        newMovieCardBody.appendChild(newMovieTitle);
        newMovieCardBody.appendChild(newMovieOverview);
        newMovieCard.appendChild(newMovieUl);
        newMovieUl.appendChild(newMovieRelease);
        newMovieUl.appendChild(newMovieGenre);
        newMovieUl.appendChild(newMovieVote);

        movie_list.appendChild(newMovieRow);
        movie_list.appendChild(newMovieLine);
        newMovieRow.appendChild(newReviewCol);


        // filter 사용하여 review movie id값과 api movie id값이 같은 경우만 filtering시켜 연결
        const matchingReviews = reviews.filter(review => review.movie[0] === movie.id);

        matchingReviews.forEach(review => {
            // 리뷰 GET 박스
            const newReviewRow = document.createElement("div");
            newReviewRow.setAttribute("class", "row mt-3");
            newReviewRow.style.backgroundColor = "aliceblue";
            newReviewRow.style.borderRadius = "15px";
            // 리뷰 컨텐츠
            const newReviewContnet = document.createElement("p");
            newReviewContnet.innerHTML = review.content;
            newReviewContnet.style.display = "inline";
            newReviewContnet.style.fontSize = "1.2rem";
            // 리뷰 작성자
            const newReviewUser = document.createElement("span");
            newReviewUser.innerHTML = review.user;
            newReviewUser.style.display = "inline-block";
            newReviewUser.style.textAlign = "end";
            // 리뷰 평점 -> 별로 표기 연구
            const newReviewRating = document.createElement("span");
            newReviewRating.innerHTML = `평점 : ${review.rating}`;
            newReviewRating.style.color = "orange";
            // 리뷰 좋아요 -> 버튼으로 누르면 좋아요 오르게끔 구현할수있을까
            const newReviewLike = document.createElement("span");
            newReviewLike.innerHTML = `좋아요 : ${review.likes_count}`;
            newReviewLike.style.color = "crimson";

            newReviewRow.appendChild(newReviewContnet);
            newReviewRow.appendChild(newReviewUser);
            newReviewRow.appendChild(newReviewRating);
            newReviewRow.appendChild(newReviewLike);

            newReviewCol.appendChild(newReviewRow);

        });
        // 리뷰 POST div(Form)
        const reviewForm = document.createElement("div");
        reviewForm.setAttribute("class", "row-1");
        reviewForm.style.position = "sticky";
        reviewForm.style.top = "100%";
        reviewForm.style.marginTop = "10px";
        // 리뷰 작성 content
        const reviewContent = document.createElement("input");
        reviewContent.setAttribute("class", "form-control");
        reviewContent.setAttribute("type", "text");
        reviewContent.setAttribute("placeholder", "리뷰를 작성해주세요.");
        reviewContent.setAttribute("aria-label", "default input example.");
        reviewContent.setAttribute("id", `movie-content-${movie.id}`);
        // 리뷰 별점 div
        const reviewRatingDiv = document.createElement("div");
        reviewRatingDiv.setAttribute("class", "container mt-2");
        reviewRatingDiv.style.width = "40%";
        reviewRatingDiv.style.display = "inline-block";
        // 리뷰 별점 설명
        const reviewRatingLabel = document.createElement("label");
        reviewRatingLabel.setAttribute("class", "form-label");
        reviewRatingLabel.setAttribute("for", `movie-rating-${movie.id}`);
        // 전문가 평점이 10점만점이라 조금 어색한거같기도하고 그대로해도 될것같기도하고
        reviewRatingLabel.innerHTML = "평점(0 ~ 5)";
        // 리뷰 별점 input
        const reviewRatingInput = document.createElement("input");
        reviewRatingInput.setAttribute("type", "range");
        reviewRatingInput.setAttribute("class", "form-range");
        reviewRatingInput.setAttribute("min", "0");
        reviewRatingInput.setAttribute("max", "5");
        reviewRatingInput.setAttribute("step", "0.5");
        reviewRatingInput.setAttribute("id", `movie-rating-${movie.id}`); // id 중복되니까 각자 다른 url로 들어가게 작성해서 버튼도 해야함
        // 리뷰 제출 버튼
        const reviewRatingBtn = document.createElement("button");
        reviewRatingBtn.setAttribute("type", "button");
        reviewRatingBtn.setAttribute("class", "btn btn-danger");
        reviewRatingBtn.setAttribute("id", `movie-button-${movie.id}`);
        // 버튼에 movie.id 주고, postReview()함수에 movie.id 자체를 parameter로 넣어서 postReview(id)에서 id를 모두 돌려서 사용할 수 있도록..!
        reviewRatingBtn.setAttribute("onclick", `postReview(${movie.id})`);
        reviewRatingBtn.style.float = "right";
        reviewRatingBtn.style.display = "inline";
        reviewRatingBtn.style.marginTop = "10px";
        reviewRatingBtn.innerHTML = "작성하기";

        newReviewCol.appendChild(reviewForm);
        reviewForm.appendChild(reviewContent);
        reviewForm.appendChild(reviewRatingDiv);
        reviewRatingDiv.appendChild(reviewRatingLabel);
        reviewRatingDiv.appendChild(reviewRatingInput);
        reviewForm.appendChild(reviewRatingBtn);
    });

    // 로그인 상태를 체크하는 함수입니다. 로그인하지 않아 token값(payload)이 없다면 글작성 폼을 display = none으로 바꿉니다.
    // getElementsByClassName로 가져온 객체는 HTMLinclude라는 살아있는 객체. 그래서 Array.from으로 배열에 따로 담아줘야 합니다. 이후 for문
    function checkLogin() {
        const payload = localStorage.getItem("payload");
        const postReviewForms = document.getElementsByClassName("row-1");
        const postReviewFormsArray = Array.from(postReviewForms);
        if (!payload) {
            postReviewFormsArray.forEach(postReviewForm => postReviewForm.style.display = "none");
        }
    }

    checkLogin();

});

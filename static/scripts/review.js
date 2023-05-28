// Movie API, Review 불러오는 함수 모듈화
function displayMovies(movies) {
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
            newReviewRow.style.backgroundColor = "white";
            newReviewRow.style.borderRadius = "7px";
            // 리뷰 컨텐츠
            const newReviewContnet = document.createElement("p");
            newReviewContnet.innerHTML = review.content;
            newReviewContnet.style.display = "inline";
            newReviewContnet.style.fontSize = "1.2rem";
            newReviewContnet.style.marginTop = "7px";
            // 리뷰 작성자
            const newReviewUser = document.createElement("span");
            newReviewUser.innerHTML = review.user;
            newReviewUser.style.display = "inline-block";
            newReviewUser.style.textAlign = "end";
            // 리뷰 평점 -> 별로 표기 연구
            const newReviewRating = document.createElement("span");
            if (review.rating == "0") {
                newReviewRating.textContent = '❌';
            } else {
                newReviewRating.textContent = getStarRating(review.rating);
            }
            // 리뷰 좋아요 버튼
            const newReviewLikeBtn = document.createElement("button");
            newReviewLikeBtn.setAttribute("type", "button")
            newReviewLikeBtn.setAttribute("id", `button-${review.id}`)
            // parameter 두개일 때는 ${} 안에서 두개 써주기
            newReviewLikeBtn.setAttribute("onclick", `likeReview(${movie.id}, ${review.id})`)
            newReviewLikeBtn.classList = "btn btn-outline-danger btn-sm"
            newReviewLikeBtn.style.maxWidth = "100px"
            newReviewLikeBtn.style.margin = "7px"
            // 리뷰 좋아요 버튼의 하트문자열
            const newReviewLikeHeart = document.createElement("span");
            newReviewLikeHeart.textContent = "❤ 좋아요 : "
            // 리뷰 좋아요 버튼의 값
            const newReviewLikeValue = document.createElement("span");
            newReviewLikeValue.setAttribute("id", "likeCount")
            newReviewLikeValue.textContent = `${review.likes_count}`;

            newReviewRow.appendChild(newReviewContnet);
            newReviewRow.appendChild(newReviewUser);
            newReviewRow.appendChild(newReviewRating);
            newReviewRow.appendChild(newReviewLikeBtn);
            newReviewLikeBtn.appendChild(newReviewLikeHeart);
            newReviewLikeBtn.appendChild(newReviewLikeValue);

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
        const reviewPostDiv = document.createElement("div");
        reviewPostDiv.setAttribute("class", "container mt-2");
        reviewPostDiv.style.width = "40%";
        reviewPostDiv.style.display = "inline-block";
        // 리뷰 별점 설명
        const reviewPostLabel = document.createElement("label");
        reviewPostLabel.setAttribute("class", "form-label");
        reviewPostLabel.setAttribute("for", `movie-rating-${movie.id}`);
        // 전문가 평점이 10점만점이라 조금 어색한거같기도하고 그대로해도 될것같기도하고
        reviewPostLabel.innerHTML = "평점(0 ~ 5)";
        // 리뷰 별점 input
        const reviewPostInput = document.createElement("input");
        reviewPostInput.setAttribute("type", "range");
        reviewPostInput.setAttribute("class", "form-range");
        reviewPostInput.setAttribute("min", "0");
        reviewPostInput.setAttribute("max", "5");
        reviewPostInput.setAttribute("step", "1");
        reviewPostInput.setAttribute("id", `movie-rating-${movie.id}`);
        // 리뷰 제출 버튼
        const reviewPostBtn = document.createElement("button");
        reviewPostBtn.setAttribute("type", "button");
        reviewPostBtn.setAttribute("class", "btn btn-danger");
        reviewPostBtn.setAttribute("id", `movie-button-${movie.id}`);
        reviewPostBtn.setAttribute("onclick", `postReview(${movie.id})`);
        reviewPostBtn.style.float = "right";
        reviewPostBtn.style.display = "inline";
        reviewPostBtn.style.marginTop = "10px";
        reviewPostBtn.innerHTML = "작성하기";

        newReviewCol.appendChild(reviewForm);
        reviewForm.appendChild(reviewContent);
        reviewForm.appendChild(reviewPostDiv);
        reviewPostDiv.appendChild(reviewPostLabel);
        reviewPostDiv.appendChild(reviewPostInput);
        reviewForm.appendChild(reviewPostBtn);
    });
};

function getStarRating(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '⭐️';
    }
    return stars;
}

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

let page = 1
// 
// 페이지 렌더링 함수, 페이지별로 렌더링 하게끔 변경했습니다
async function renderPage(index) {
    // Movie/Review HTML을 초기화 한 후에
    const movieList = document.getElementById("review-movie");
    movieList.innerHTML = "";
    const pagination = document.getElementById("paginator")
    pagination.innerHTML = "";
    // 다시 불러와서..
    movies = await getPaginatedMovies(index);
    reviews = await getReviewPageReviews();

    // 렌더링 - 좋은 방식은 아닌 것 같습니다.. 주소창에 ?page=1라는 query도 안생기고
    displayMovies(movies);

    checkLogin();

    page = index
    handlePagination(page)
}

async function handlePagination(page) {
    movies = await getPaginatedMovies(page)

    // 한 페이지에 보여줄 리뷰 목록이 10개. 변경시 여기도 변경해줘야함
    let totalPage = Math.ceil(movies.count / 10);
    // Page 그룹계산(Group = nav바에 띄울 Num의 수)
    const pageCount = 7;
    let pageGroup = Math.ceil(page / pageCount);
    let lastNum = pageGroup * pageCount;
    if (lastNum > totalPage) {
        lastNum = totalPage
    }
    let firstNum = lastNum - (pageCount - 1)

    // ul
    const pagination = document.getElementById("paginator")

    // prev 버튼
    // li 생성
    const prevLi = document.createElement("li");
    prevLi.setAttribute("class", "page-item")
    // a 생성
    const prevLink = document.createElement("a");
    prevLink.setAttribute("class", "page-link")
    prevLink.innerHTML = "이전"
    prevLink.href = "javascript:;"
    if (page >= 2) {
        prevLink.setAttribute("onclick", `renderPage(${page - 1})`)
    } else {
        prevLink.classList.add("disabled");
    }

    prevLi.appendChild(prevLink)
    pagination.appendChild(prevLi)

    // pageNum
    // 현재 페이지 포함 좌우로 몇개를 띄울 것인지

    // li 생성
    // for문으로 back의 page_size였던 10으로 데이터수를 나눈 뒤 올림처리(Math.ceil)
    for (i = firstNum; i <= lastNum; i++) {
        const pageLi = document.createElement("li");
        pageLi.setAttribute("class", "page-item")
        // a 생성
        const pageLink = document.createElement("a");
        pageLink.setAttribute("class", "page-link")
        pageLink.setAttribute("onclick", `renderPage(${i})`)
        pageLink.innerHTML = i
        pageLink.href = "javascript:;"

        pageLi.appendChild(pageLink)
        pagination.appendChild(pageLi)
    }

    // next 버튼
    // li 생성
    const nextLi = document.createElement("li");
    nextLi.setAttribute("class", "page-item")
    // a 생성
    const nextLink = document.createElement("a");
    nextLink.setAttribute("class", "page-link")
    nextLink.innerHTML = "다음"
    nextLink.href = "javascript:;"
    if (page < Math.ceil(movies.count / 10)) {
        nextLink.setAttribute("onclick", `renderPage(${page + 1})`)
    } else {
        nextLink.classList.add("disabled");
    }

    nextLi.appendChild(nextLink)
    pagination.appendChild(nextLi)

}

// 좋아요 버튼 함수
// Jquery를 통해 바로 동기화 될 수 있도록 해봤습니다.
function likeReview(movie_id, review_id) {
    $.ajax({
        url: `${backend_base_url}/reviews/${movie_id}/${review_id}/like/`,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        success: function (response) {
            let likesCount = $(`#button-${review_id}`).find("#likeCount");
            let currentLikesCount = parseInt(likesCount.text());

            // Backend 메세지를 가지고 +-1해주는게 좋은 방식인지는 모르겠습니다
            if (response.message === '좋아요 취소!') {
                likesCount.text(currentLikesCount - 1);
            } else if (response.message === '좋아요 성공!') {
                likesCount.text(currentLikesCount + 1);
            }

            alert(response.message);
        },
        error: function (response) {
            alert(response.message);
        }
    });
}

renderPage(page)
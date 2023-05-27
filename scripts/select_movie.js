window.addEventListener('load',async function(){
        //백엔드 메인에서 json 데이터 받아오기
        
        data = await getMovies()
        movies = await getRandomMovies(data, 6);

        const moviesContainer = document.getElementById('random-movies');

        movies.forEach(movie => {
            const MovieImg = document.createElement("img");
            MovieImg.setAttribute("class", "card-img-top");
            MovieImg.setAttribute("alt", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg");

            if (movie.poster_path) {
                MovieImg.setAttribute("src", movie.poster_path);
            } else {
                MovieImg.setAttribute("src", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg");
            }
            //영화 포스터 클릭시 상세 페이지로 이동
            MovieImg.addEventListener("click", function () {
                // 영화의 ID를 추출하여 URL에 추가
                const movieId = movie.id;
                // const detailPageUrl = `${frontend_base_url}/select_movie/${movieId}.html`;
                const detailPageUrl = `${frontend_base_url}/recommend.html?movieId=${movieId}`;

                // 상세 페이지로 이동
                window.location.href = detailPageUrl;
            });


            const MovieCard = document.createElement("div");
            MovieCard.setAttribute("class", "card col-3 d-inline-block");
            MovieCard.style.padding = "0";
            MovieCard.style.marginRight = "30px";
            MovieCard.style.margin = "30px";

            const MovieCardBody = document.createElement("div");
            MovieCardBody.setAttribute("class", "card-body");
            MovieCardBody.style.overflow = "auto";

            const MovieTitle = document.createElement("h4");
            MovieTitle.setAttribute("class", "card-title");
            MovieTitle.innerHTML = movie.title;
            const MovieOverview = document.createElement("p");
            MovieOverview.setAttribute("class", "card-text");
            MovieOverview.innerHTML = movie.overview;

            MovieOverview.innerHTML = movie.overview;
            MovieOverview.innerHTML = MovieOverview.innerHTML.substring(0, 150);
            if (MovieOverview.innerHTML.length >= 150) {
                MovieOverview.innerHTML += "...";
            }
            const MovieUl = document.createElement("ul");
            MovieUl.setAttribute("class", "list-group list-group-flush");
            // Movie li 개봉일
            const MovieRelease = document.createElement("li");
            MovieRelease.setAttribute("class", "list-group-item");
            MovieRelease.innerHTML = `개봉일 : ${movie.release_date}`;
            // Movie li 장르
            const MovieGenre = document.createElement("li");
            MovieGenre.setAttribute("class", "list-group-item");
            for (genre = 0; genre < movie.genres.length; genre++) {
                MovieGenre.innerHTML += `${movie.genres[genre]}, `;
            }
            // replace() 메서드가 문자열을 수정하는 것이 아니라 새로운 문자열을 반환하기 때문에 =로 지정해줘야한다.
            MovieGenre.innerHTML = MovieGenre.innerHTML.replace(/,\s*$/, "");
            // Movie li 평점
            const MovieVote = document.createElement("li");
            MovieVote.setAttribute("class", "list-group-item");
            MovieVote.innerHTML = `전문가평점 : ${movie.vote_average}`;


            MovieCard.appendChild(MovieImg);
            MovieCard.appendChild(MovieCardBody);
            MovieCardBody.appendChild(MovieTitle);
            MovieCardBody.appendChild(MovieOverview);
            MovieCard.appendChild(MovieUl);
            MovieUl.appendChild(MovieRelease);
            MovieUl.appendChild(MovieGenre);
            MovieUl.appendChild(MovieVote);

            moviesContainer.appendChild(MovieCard);
            // moviesContainer.appendChild(MovieLine);

        });
    } 
);

// 다시 검색 버튼 클릭 이벤트 핸들러
const reloadButton = document.getElementById("reload_movies")
reloadButton.addEventListener('click', function () {
    location.reload(); // 페이지 리로드
});
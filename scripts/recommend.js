window.addEventListener('load', async function () {
    const selectedMovie = await getSelectedMovie();

    const selectedmovieContainer = document.getElementById('selected-movies');

    const cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "row");

    const moviePosterColumn = document.createElement("div");
    moviePosterColumn.setAttribute("class", "col-md-4");

    const movieDescriptionColumn = document.createElement("div");
    movieDescriptionColumn.setAttribute("class", "col-md-8");

    const movieDescriptionWrapper = document.createElement("div");
    movieDescriptionWrapper.setAttribute("class", "card-body");

    const movieTitle = document.createElement("h4");
    movieTitle.setAttribute("class", "card-title");
    movieTitle.innerHTML = selectedMovie.title;

    const movieOverview = document.createElement("p");
    movieOverview.setAttribute("class", "card-text");
    movieOverview.innerHTML = selectedMovie.overview;

    const movieDetailsList = document.createElement("ul");
    movieDetailsList.setAttribute("class", "list-group list-group-flush");

    const movieRelease = document.createElement("li");
    movieRelease.setAttribute("class", "list-group-item");
    movieRelease.innerHTML = `개봉일: ${selectedMovie.release_date}`;

    const movieGenre = document.createElement("li");
    movieGenre.setAttribute("class", "list-group-item");
    const genreNames = selectedMovie.genres.map(genre => genre.name); // 장르 이름들을 추출하여 배열로 저장
    const genreString = "장르: " + genreNames.join(", "); // "장르: " 문자열과 장르 이름들을 쉼표로 구분하여 하나의 문자열로 연결
    movieGenre.innerHTML = genreString;

    const movieVote = document.createElement("li");
    movieVote.setAttribute("class", "list-group-item");
    movieVote.innerHTML = `전문가평점: ${selectedMovie.vote_average}`;

    const moviePoster = document.createElement("img");
    moviePoster.setAttribute("class", "card-img-top");
    moviePoster.setAttribute("src", selectedMovie.poster_path);
    moviePoster.setAttribute("alt", selectedMovie.title);
    moviePoster.setAttribute("style", "width: 350px; height: auto;");
    moviePoster.classList.add("img-fluid");


    movieDescriptionWrapper.appendChild(movieTitle);
    movieDescriptionWrapper.appendChild(movieOverview);
    movieDetailsList.appendChild(movieRelease);
    movieDetailsList.appendChild(movieGenre);
    movieDetailsList.appendChild(movieVote);
    movieDescriptionWrapper.appendChild(movieDetailsList);

    movieDescriptionColumn.appendChild(movieDescriptionWrapper);
    moviePosterColumn.appendChild(moviePoster);

    cardContainer.appendChild(moviePosterColumn);
    cardContainer.appendChild(movieDescriptionColumn);

    selectedmovieContainer.appendChild(cardContainer);


    
    const recommendMovies = await handleLoadEvent();
    const moviesContainer = document.getElementById('random-movies');

    moviesContainer.style.display = "flex"; // Flexbox 적용
    moviesContainer.style.flexWrap = "wrap"; // 줄 바꿈 설정
    moviesContainer.style.justifyContent = "space-between"; // 아이템들을 양쪽으로 정렬

    recommendMovies.forEach(recommendMovie => {
        const movieCard = document.createElement("div");
        movieCard.setAttribute("class", "card col-2");
        movieCard.style.width = "16%";
        movieCard.style.marginBottom = "10px";

        const movieImg = document.createElement("img");
        movieImg.setAttribute("class", "card-img-top");
        movieImg.setAttribute("alt", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg");
        if (recommendMovie.poster_path) {
            movieImg.setAttribute("src", recommendMovie.poster_path);
        } else {
            movieImg.setAttribute("src", "https://user-images.githubusercontent.com/127704498/240243854-3122696a-1247-442b-9f4b-4bf357419313.jpg");
        }

        const movieTitle = document.createElement("h5");
        movieTitle.setAttribute("class", "card-title");
        movieTitle.style.textAlign = "center"; // 가운데 정렬 설정
        movieTitle.innerHTML = recommendMovie.title;

        movieCard.appendChild(movieImg);
        movieCard.appendChild(movieTitle);

        moviesContainer.appendChild(movieCard);

        movieCard.addEventListener("mouseover", function () {
            movieCard.style.transform = "scale(1.05)"; // 영화 카드 크기 조정
            movieCard.style.transition = "transform 0.3s"; // 애니메이션 효과
        });

        movieCard.addEventListener("mouseout", function () {
            movieCard.style.transform = "scale(1)"; // 영화 카드 크기 원래 상태로 복원
            movieCard.style.transition = "transform 0.3s"; // 애니메이션 효과
        });
    });
});








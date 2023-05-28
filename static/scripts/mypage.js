window.onload = async function loadReviews() {
    const reviews = await getMypageReviews();
    const user_reviews = reviews.user_reviews;

    const reviewBox = document.getElementById("review_box");

    for (let i = 0; i < user_reviews.length; i++) {
        const review = user_reviews[i];

        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        const imgCell = document.createElement("img");
        imgCell.src = review.movie[5];
        imgCell.alt = "Movie Image";
        reviewCard.appendChild(imgCell);

        const contentCell = document.createElement("div");
        contentCell.classList.add("content-cell");

        const reviewCell = document.createElement("div");
        reviewCell.classList.add("review-cell");
        reviewCell.textContent = review.content;
        contentCell.appendChild(reviewCell);

        const rateCell = document.createElement("div");
        rateCell.classList.add("rate-cell");
        if (review.rating == "0") {
            rateCell.textContent = '❌';
        } else {
            rateCell.textContent = getStarRating(review.rating);
        }
        contentCell.appendChild(rateCell);

        reviewCard.appendChild(contentCell);

        const btnCell = document.createElement("div");
        btnCell.classList.add("btn-cell");

        const updateBtn = document.createElement("button");
        updateBtn.classList.add("btn", "btn-primary", "update-btn");
        updateBtn.textContent = "수정";
        updateBtn.style.marginRight = "5px";
        btnCell.appendChild(updateBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger", "delete-btn");
        deleteBtn.textContent = "삭제";
        btnCell.appendChild(deleteBtn);

        reviewCard.appendChild(btnCell);

        reviewBox.appendChild(reviewCard);

        updateBtn.addEventListener("click", async function () {
            // SweetAlert2를 사용하여 수정할 내용을 입력받습니다.
            const { value: updatedContent } = await Swal.fire({
                title: '후기 수정',
                input: 'textarea',
                inputLabel: '후기 내용',
                inputValue: review.content,
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return '후기 내용을 입력해주세요.';
                    }
                }
            });

            if (updatedContent) {
                // SweetAlert2를 사용하여 수정할 평점을 입력받습니다.
                const { value: updatedRating } = await Swal.fire({
                    title: '평점 수정',
                    input: 'range',
                    inputLabel: '평점',
                    inputAttributes: {
                        min: "0",
                        max: "5",
                        step: "1"
                    },
                    inputValue: review.rating,
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) {
                            return '평점을 선택해주세요.';
                        }
                    }
                });

                if (updatedRating) {
                    // rating 값이 무조건 float형으로 들어가야 하므로 parseFloat과 toFixed(1)을 활용해 소수점 아래 1자리로 값을 제한합니다.
                    // rating을 IntegerField로 바꾸면서 int로 바꿨습니다!
                    const intRating = parseInt(updatedRating)
                    const response = await fetch(`${backend_base_url}/reviews/${review.movie[0]}/${review.id}/`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("access")
                        },
                        body: JSON.stringify({
                            "content": updatedContent,
                            "rating": intRating
                        })
                    });

                    if (response.status === 200) {
                        alert("후기와 평점이 수정되었습니다.");
                        // 후기를 다시 로드하여 갱신된 내용을 반영할 수 있도록 처리
                        loadReviews();
                    } else {
                        alert("후기와 평점 수정에 실패했습니다.");
                    }
                }
            }
        });

        // 삭제 버튼 클릭시 이벤트
        deleteBtn.addEventListener("click", async function () {
            const confirmation = confirm("정말로 후기를 삭제하시겠습니까?");
            if (confirmation) {
                const response = await fetch(`${backend_base_url}/reviews/${review.movie[0]}/${review.id}/`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("access")
                    }
                });
                if (response.status === 204) {
                    alert("후기가 삭제되었습니다.");
                    // 후기를 다시 로드하여 갱신된 내용을 반영할 수 있도록 처리
                    loadReviews();
                } else {
                    alert("후기 삭제에 실패했습니다.");
                }
            }
        });
    }
}

function getStarRating(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '⭐️';
    }
    return stars;
}
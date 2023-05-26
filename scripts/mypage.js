// // Mypage API - 사용자 리뷰 가져오기
// async function getUserReviews() {
//     try {
//         const response = await fetch(`${backend_base_url}/mypage/reviews`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (response.status === 200) {
//             const reviews = await response.json();
//             return reviews;
//         } else {
//             alert('사용자 리뷰를 가져오는 데 실패했습니다.');
//         }
//     } catch (error) {
//         console.error('사용자 리뷰를 가져오는 중 오류 발생:', error);
//         alert('사용자 리뷰를 가져오는 동안 오류가 발생했습니다.');
//     }
// }

// // 사용자 리뷰 표시
// async function renderUserReviews() {
//     const container = document.getElementById('user-reviews-container');

//     try {
//         const reviews = await getUserReviews();

//         reviews.forEach(review => {
//             // 각 리뷰에 대한 HTML 요소 생성
//             const reviewElement = document.createElement('div');
//             reviewElement.textContent = review.content;
//             // 필요한 경우 다른 속성, 스타일 등 설정

//             // 리뷰 요소를 컨테이너에 추가
//             container.appendChild(reviewElement);
//         });
//     } catch (error) {
//         console.error('사용자 리뷰를 표시하는 중 오류 발생:', error);
//     }
// }

// // 페이지가 로드될 때 사용자 리뷰를 표시하도록 renderUserReviews 함수 호출
// window.addEventListener('load', renderUserReviews);


// window.onload = async function loadReviews() {
//     const reviews = await getMypageReviews();
//     const user_reviews = reviews.user_reviews;

//     const reviewBox = document.getElementById("review_box");

//     for (let i = 0; i < user_reviews.length; i++) {
//         const review = user_reviews[i];

//         const li = document.createElement("li");
//         li.classList.add("list-group-item");

//         const imgCell = document.createElement("img");
//         imgCell.src = review.movie[5];
//         imgCell.alt = "Movie Image";
//         imgCell.classList.add("img_cell");
//         li.appendChild(imgCell);

//         const contentCell = document.createElement("div");
//         contentCell.classList.add("content_cell");
//         li.appendChild(contentCell);

//         const reviewCell = document.createElement("div");
//         reviewCell.classList.add("review_cell");
//         reviewCell.textContent = review.content;
//         contentCell.appendChild(reviewCell);

//         const rateCell = document.createElement("div");
//         rateCell.classList.add("rate_cell");
//         rateCell.textContent = review.rating;
//         contentCell.appendChild(rateCell);

//         const btnCell = document.createElement("div");
//         btnCell.classList.add("btn_cell");
//         li.appendChild(btnCell);

//         const updateBtn = document.createElement("button");
//         updateBtn.classList.add("btn", "btn-primary", "update_btn");
//         updateBtn.textContent = "수정";
//         btnCell.appendChild(updateBtn);

//         const deleteBtn = document.createElement("button");
//         deleteBtn.classList.add("btn", "btn-danger", "delete_btn");
//         deleteBtn.textContent = "삭제";
//         btnCell.appendChild(deleteBtn);

//         reviewBox.appendChild(li);
//     }
// }

window.onload = async function loadReviews() {
    const reviews = await getMypageReviews();
    const user_reviews = reviews.user_reviews;
    console.log(user_reviews)

    const reviewBox = document.getElementById("review_box");

    for (let i = 0; i < user_reviews.length; i++) {
        const review = user_reviews[i];
        console.log(review.movie[0])

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
        rateCell.textContent = getStarRating(review.rating);
        contentCell.appendChild(rateCell);

        reviewCard.appendChild(contentCell);

        const btnCell = document.createElement("div");
        btnCell.classList.add("btn-cell");

        const updateBtn = document.createElement("button");
        updateBtn.classList.add("btn", "btn-primary", "update-btn");
        updateBtn.textContent = "수정";
        btnCell.appendChild(updateBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger", "delete-btn");
        deleteBtn.textContent = "삭제";
        btnCell.appendChild(deleteBtn);

        reviewCard.appendChild(btnCell);

        reviewBox.appendChild(reviewCard);

        // // 수정 버튼 클릭 이벤트 핸들러
        // updateBtn.addEventListener("click", async function () {
        //     const updatedContent = prompt("수정할 내용을 입력하세요.", review.content);
        //     if (updatedContent) {
        //         const response = await fetch(`${backend_base_url}/reviews/${review.movie[0]}/${review.id}/`, {
        //             method: "PUT",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "Authorization": "Bearer " + localStorage.getItem("access")
        //             },
        //             body: JSON.stringify({
        //                 content: updatedContent,
        //                 rating: review.rating
        //             })
        //         });
        //         if (response.status === 200) {
        //             alert("후기가 수정되었습니다.");
        //             // 후기를 다시 로드하여 갱신된 내용을 반영할 수 있도록 처리
        //             loadReviews();
        //         } else {
        //             alert("후기 수정에 실패했습니다.");
        //         }
        //     }
        // });
        // 수정 버튼 클릭시 이벤트
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
                        min: 1.0,
                        max: 5.0,
                        step: 0.5
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
                    const floatRating = parseFloat(updatedRating).toFixed(1);
                    console.log(floatRating)
                    const response = await fetch(`${backend_base_url}/reviews/${review.movie[0]}/${review.id}/`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("access")
                        },
                        body: JSON.stringify({
                            "content": updatedContent,
                            "rating": floatRating
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
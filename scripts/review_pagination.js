let page = 2;

let movies;

console.log(page)

async function getPaginatedMovies(page) {
    const response = await fetch(`${backend_base_url}/movie/?page=${page}`)


    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}

window.addEventListener('load', async function () {

    movies = await getPaginatedMovies(page)
    console.log(movies.count)
    console.log(Math.ceil(movies.count / 10))

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
    // if (page >= 2) {
    //     prevLink.setAttribute("onclick", `pageMove(${i - 1})`)
    // } else {
    //     prevLink.classList.add("disabled");
    // }

    prevLi.appendChild(prevLink)
    pagination.appendChild(prevLi)

    // pageNum
    // li 생성
    // for문으로 back의 page_size였던 10으로 데이터수를 나눈 뒤 올림처리(Math.ceil)
    for (i = 1; i <= Math.ceil(movies.count / 10); i++) {
        const pageLi = document.createElement("li");
        pageLi.setAttribute("class", "page-item")
        // a 생성
        const pageLink = document.createElement("a");
        pageLink.setAttribute("class", "page-link")
        pageLink.setAttribute("onclick", `getPaginatedMovies(${i})`)
        // pageLink.onclick = () => pageMove(i)
        pageLink.innerHTML = i
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
    // if (page < Math.ceil(movies.count / 10)) {
    //     nextLink.setAttribute("onclick", `pageMove(${i + 1})`)
    // } else {
    //     nextLink.classList.add("disabled");
    // }

    nextLi.appendChild(nextLink)
    pagination.appendChild(nextLi)

})
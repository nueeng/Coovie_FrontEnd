// includeHTML파일 대신 fetch로 뿌려주기 (컴포넌트화, 프로젝트 아키텍쳐)
async function injectNavbar() {
    fetch("./sidebar.html").then(response => {
        return response.text()
    })
        .then(data => {
            document.querySelector("sidebar").innerHTML = data;
        })
    let navbarHtml = await fetch("./sidebar.html")
    let data = await navbarHtml.text()
    document.querySelector("sidebar").innerHTML = data;


    const payload = localStorage.getItem("payload");
    if (payload) {

        const mypage = document.getElementById("mypage")
        mypage.innerText = "마이페이지"


        let ul = document.getElementById("li-leftbar")
        let newLi = document.createElement("li")


        let logoutBtn = document.createElement("a")
        logoutBtn.href = "#"
        logoutBtn.style.color = "#FFF6C3"
        logoutBtn.innerText = "로그아웃"
        logoutBtn.setAttribute("onClick", "handleLogout()")

        newLi.appendChild(logoutBtn)

        ul.insertBefore(newLi, ul.childNodes[2]);


        let signInButton = document.getElementById("li-signin")
        signInButton.style.display = "none";
        let signUpButton = document.getElementById("li-signup")
        signUpButton.style.display = "none";
    }
}

injectNavbar();

function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload()
}
// sytle.display = "none";을 줬으면 다시 block같은거로 바꿔줘야함
// 여기선 relaod()가 새로고침이라 모든 했던 자바스크립트 기록이 사라져서 없어도 괜찮은 것
async function injectNavbar() {
    fetch("/sidebar.html").then(response => {
        return response.text()
    })
        .then(data => {
            document.querySelector("header").innerHTML = data;
            const payload = localStorage.getItem("payload");

            if (payload) {
                const payload = localStorage.getItem("payload");
                const payload_parse = JSON.parse(payload)
                const login_user = document.getElementById("login_user")
                login_user.innerText = payload_parse.user_name

                const is_admin = payload_parse.is_admin;
                const saveLink = document.querySelector('#save_link');

                if (is_admin) {
                    saveLink.style.display = 'block'; // is_admin이 true인 경우 보이도록 설정
                } else {
                    saveLink.style.display = 'none'; // is_admin이 false인 경우 숨기도록 설정
                }

                const slideBtn = document.querySelector('.slide_btn');
                const sidebar = document.querySelector('.sidebar-wrap');
                const sidebar_login = document.querySelector('.sidebar-wrap_login');
                var isNavVisible = false;

                sidebar.style.width = '0px'; // 초기 너비를 0으로 설정
                sidebar.style.opacity = '0'; // 초기 투명도를 0으로 설정
                sidebar_login.style.width = '0px';
                sidebar_login.style.opacity = '0';

                slideBtn.addEventListener("mouseenter", function () {
                    isNavVisible = !isNavVisible;
                    sidebar_login.style.transition = 'width 0.5s, opacity 0.5s'; // 너비와 투명도에 애니메이션 적용
                    sidebar_login.style.width = isNavVisible ? "15.5%" : "0"; // 너비 변화 설정
                    sidebar_login.style.opacity = isNavVisible ? "1" : "0"; // 투명도 변화 설정
                });

                sidebar_login.addEventListener("mouseleave", function () {
                    isNavVisible = !isNavVisible;
                    sidebar.style.width = '0px'; // 초기 너비를 0으로 설정
                    sidebar.style.opacity = '0'; // 초기 투명도를 0으로 설정
                    sidebar_login.style.width = '0px';
                    sidebar_login.style.opacity = '0';
                });
            } else {
                const slideBtn = document.querySelector('.slide_btn');
                const sidebar = document.querySelector('.sidebar-wrap');
                const sidebar_login = document.querySelector('.sidebar-wrap_login');
                var isNavVisible = false;

                sidebar.style.width = '0px'; // 초기 너비를 0으로 설정
                sidebar.style.opacity = '0'; // 초기 투명도를 0으로 설정
                sidebar_login.style.width = '0px';
                sidebar_login.style.opacity = '0';

                slideBtn.addEventListener("mouseenter", function () {
                    isNavVisible = !isNavVisible;
                    sidebar.style.transition = 'width 0.5s, opacity 0.5s'; // 너비와 투명도에 애니메이션 적용
                    sidebar.style.width = isNavVisible ? "15.5%" : "0"; // 너비 변화 설정
                    sidebar.style.opacity = isNavVisible ? "1" : "0"; // 투명도 변화 설정
                });

                sidebar.addEventListener("mouseleave", function () {
                    isNavVisible = !isNavVisible;
                    sidebar.style.width = '0px'; // 초기 너비를 0으로 설정
                    sidebar.style.opacity = '0'; // 초기 투명도를 0으로 설정
                    sidebar_login.style.width = '0px';
                    sidebar_login.style.opacity = '0';
                });
            }
        })
    fetch("/footer.html").then(response => {
        return response.text()
    })
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        })
}

injectNavbar();

async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃 했습니다!")
}
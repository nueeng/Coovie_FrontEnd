// Signin이라는 함수는 데이터 통신만 하고, Button함수에서 parsing, validation을. 각 함수 객체가 독립적일 수 있도록
// button을 여기남기고 위에 fetch로 통신하는 부분을 api로?
async function handleSigninButton() {
    const response = await handleSignin();

    if (response.status == 200) {
        const response_json = await response.json()

        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        alert("환영합니다.")
        // ${frontend_base_url}
        window.location.replace(`${frontend_base_url}/`)
    } else {
        alert("회원정보가 일치하지 않습니다.")
    }
}

checkSignin()
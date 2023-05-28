// Signup 함수
async function handleSignupButton() {
    const password = document.getElementById("password").value
    const re_password = document.getElementById("re_password").value
    const response = await handleSignup();

    if (password === re_password) {
        if (response.status == 201) {
            alert("회원가입을 축하합니다! 회원가입시 입력하신 이메일 주소에서 본인 인증을 진행하신 후 로그인해 주세요!")
            window.location.replace(`${frontend_base_url}/signin.html`)
        }
    } else {
        alert("비밀번호가 다릅니다.")
    };
}

checkSignin()
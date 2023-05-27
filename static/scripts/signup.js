// Signup 함수
async function handleSignupButton() {
    const response = await handleSignup();

    if (password === re_password) {
        if (response.status == 201) {
            alert("회원가입을 축하합니다!")
            window.location.replace(`${frontend_base_url}/signin.html/`)
        }
    } else {
        alert("비밀번호가 다릅니다.")
    };
}

checkSignin()
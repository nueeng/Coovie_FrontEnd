function checkSignin() {
    const payload = localStorage.getItem("payload");
    if (payload) {
        window.location.replace(`${frontend_base_url}`)
    }
}

checkSignin()

// Signup 함수
async function handleSignup() {
    const user_name = document.getElementById("user_name").value
    const password = document.getElementById("password").value
    const re_password = document.getElementById("re_password").value
    const email = document.getElementById("email").value

    const response = await fetch(`${backend_base_url}/users/sign-up/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "user_name": user_name,
            "email": email,
            "password": password,
            "re_password": re_password
        })
    })

    if (password === re_password) {


        if (response.status == 201) {
            alert("회원가입을 축하합니다!")
            window.location.replace(`${frontend_base_url}/signin.html`)
        }

        // if (response.status == 400) {
        //     alert(`${response_message}`)
        // }
    } else {
        alert("비밀번호가 다릅니다.")
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const saveMoviesBtn = document.getElementById('saveMoviesBtn');
    
    saveMoviesBtn.addEventListener('click', function() {
        const url = `${backend_base_url}/save/`; 
        const accessToken = localStorage.getItem('access');
        const data = {}; // 전송할 JSON 데이터 객체

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(responseText => {
            alert(responseText); // 성공 메시지를 알림창으로 표시
        })

        
    });
});
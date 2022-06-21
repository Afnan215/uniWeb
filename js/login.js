// login
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const loginButton = document.querySelector('#login-btn');
// reset password
const loginPopup = document.querySelector('.message-popup');
const resetButton = document.querySelector('#reset-btn');
const responseMssg = document.querySelector('#response-mssg');


let LoginFormData = {
    email: '',
    password: ''
}


loginEmail.addEventListener('change', (e) => {
    LoginFormData.email = e.target.value;
})
loginPassword.addEventListener('change', (e) => {
    LoginFormData.password = e.target.value;
});
const loginFormSubmit = (e, formData) => {
    e.preventDefault();
    fetch('https://uni-portal-backend.herokuapp.com/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        })
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('email', data.data.email)
                localStorage.setItem('name', data.data.firstName + data.data.lastName);
                localStorage.setItem('loggedIn', true);
                loginPopup.style.remove?.('background')
                responseMssg.innerHTML = data?.message
                loginPopup.classList.add('show');
                setTimeout(() => {
                    loginPopup.classList.remove('show');
                    window.location = './index.html';
                }, 2000)
                // window.location = './index.html'
            } else {
                responseMssg.innerHTML = data?.message
                loginPopup.classList.add('show');
                setTimeout(() => {
                    loginPopup.classList.remove('show');
                    loginPopup.style.remove('background')
                }, 2000)
            }

        })
        .catch(err => {
            alert(err.message);
        })

}

loginButton.addEventListener('click', (e) => loginFormSubmit(e, LoginFormData))





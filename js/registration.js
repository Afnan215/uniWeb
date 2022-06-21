// registration
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const phoneNumber = document.querySelector('#phoneNumber');
const password = document.querySelector('#password');
const passwordConfirmation = document.querySelector('#passwordConfirmation');
const registerButton = document.querySelector('.btn');

const loginPopup = document.querySelector('.message-popup');
const responseMssg = document.querySelector('#response-mssg');



let registerFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: "",
    password: "",
    conPassword: ""
}
let registrationLoading = false;

firstName.addEventListener('change', (e) => {
    registerFormData.firstName = e.target.value;
})
lastName.addEventListener('change', (e) => {
    registerFormData.lastName = e.target.value;
})
email.addEventListener('change', (e) => {
    registerFormData.email = e.target.value;
})
phoneNumber.addEventListener('change', (e) => {
    registerFormData.phoneNumber = e.target.value;
})
password.addEventListener('change', (e) => {
    registerFormData.password = e.target.value;
})
passwordConfirmation.addEventListener('change', (e) => {
    registerFormData.conPassword = e.target.value;
});

const submitRegisterForm = (e, formData) => {
    e.preventDefault();
    fetch('https://uni-portal-backend.herokuapp.com/register-user', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            contactNumber: formData.phoneNumber,
            password: formData.password,
            confirmPassword: formData.conPassword
        })
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                registrationLoading = false;
                responseMssg.innerHTML = data?.message
                loginPopup.classList.add('show');
                setTimeout(() => {
                    loginPopup.classList.remove('show');
                    window.location = './login.html';
                }, 2000)
            } else {
                responseMssg.innerHTML = data?.message
                loginPopup.classList.add('show');
                setTimeout(() => {
                    loginPopup.classList.remove('show');
                }, 2000)
            }

        })
        .catch(err => {
            alert(err.message);

        })
}


registerButton.addEventListener('click', (e) => submitRegisterForm(e, registerFormData))

// Login

const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const subjectInput = document.querySelector('#subject')
const messageInput = document.querySelector('#message')
const submitBtn = document.querySelector('.hero-btn')

const loginPopup = document.querySelector('.message-popup');
const responseMssg = document.querySelector('#response-mssg');

let messageFormData = {
    name: '',
    email: "",
    subject: "",
    message: ""
}

nameInput.addEventListener('change', (e) => messageFormData.name = e.target.value)
emailInput.addEventListener('change', (e) => messageFormData.email = e.target.value)
subjectInput.addEventListener('change', (e) => messageFormData.subject = e.target.value)
messageInput.addEventListener('change', (e) => messageFormData.message = e.target.value)


const submitMessageForm = (e, formData) => {
    e.preventDefault();
    fetch('https://uni-portal-backend.herokuapp.com/contact-us', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: formData.name,
            email: formData.email,
            subjects: formData.subject,
            message: formData.message
        }),
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                responseMssg.innerHTML = data?.message;
                loginPopup.classList.add('show');
                setTimeout(() => {
                    loginPopup.classList.remove('show');
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


submitBtn.addEventListener('click', (e) => {

    submitMessageForm(e, messageFormData)
})
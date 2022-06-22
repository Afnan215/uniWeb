const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const commentInput = document.getElementById('comment');
const commentBtn = document.querySelector('.comment-btn');


const loginPopup = document.querySelector('.message-popup');
const responseMssg = document.querySelector('#response-mssg');

let formData = {
    userName: '',
    userEmaIL: '',
    userComment: '',
}

let blogMessage = '';

nameInput.addEventListener('change', (e) => {
    formData.userName = e.target.value;
})
emailInput.addEventListener('change', (e) => {
    formData.userEmaIL = e.target.value;
})
commentInput.addEventListener('change', (e) => {
    formData.userComment = e.target.value;
})


const postComment = (e, formData) => {

    e.preventDefault();
    fetch('http://localhost:4000/post-comment', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.userName,
            email: formData.userEmaIL,
            comment: formData.userComment
        })
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                responseMssg.innerHTML = data?.message
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
            alert(err.message)
        })
}

commentBtn.addEventListener('click', (e) => postComment(e, formData)
)
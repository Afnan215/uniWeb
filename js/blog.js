const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const commentInput = document.getElementById('comment');
const commentBtn = document.querySelector('.comment-btn');

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
    fetch('http://192.168.0.122:4000/post-comment', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.userName,
            email: formData.userEmaIL,
            comment: formData.userComment
        })
    }).then(resp => resp.json())
        .then(data => {
            console.log(data)
            blogMessage = data.message
        })
}

commentBtn.addEventListener('click', (e) => postComment(e, formData)
)
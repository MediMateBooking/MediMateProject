const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log(email)
    console.log(password)
});


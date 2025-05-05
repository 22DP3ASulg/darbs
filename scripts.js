document.addEventListener('DOMContentLoaded', () => {
    // Валидация формы регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const submitBtn = document.getElementById('submitBtn');

        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        function validateForm() {
            let valid = true;

            if (username.value.trim() === '') {
                usernameError.style.display = 'block';
                valid = false;
            } else {
                usernameError.style.display = 'none';
            }

            if (!email.value.includes('@') || !email.value.includes('.')) {
                emailError.style.display = 'block';
                valid = false;
            } else {
                emailError.style.display = 'none';
            }

            if (password.value.length < 6) {
                passwordError.style.display = 'block';
                valid = false;
            } else {
                passwordError.style.display = 'none';
            }

            if (confirmPassword.value !== password.value || confirmPassword.value === '') {
                confirmPasswordError.style.display = 'block';
                valid = false;
            } else {
                confirmPasswordError.style.display = 'none';
            }

            submitBtn.disabled = !valid;
        }

        username.addEventListener('input', validateForm);
        email.addEventListener('input', validateForm);
        password.addEventListener('input', validateForm);
        confirmPassword.addEventListener('input', validateForm);

        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const response = await fetch('/api/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.value,
                    email: email.value,
                    password: password.value
                })
            });
            const result = await response.json();
            if (result.success) {
                alert('Registration successful! Redirecting to login...');
                window.location.href = 'login.html';
            } else {
                alert(result.error || 'Registration failed');
            }
        });
    }

    // Обработка формы логина
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const response = await fetch('/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (result.success) {
                alert('Login successful!');
                window.location.href = 'main2.html';
            } else {
                alert(result.error || 'Login failed');
            }
        });
    }
});
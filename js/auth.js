document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Инициализация хранилища
    if (!localStorage.getItem('tegrafaUsers')) {
        localStorage.setItem('tegrafaUsers', JSON.stringify({}));
    }
    
    // Проверка авторизации
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'chat.html';
        return;
    }
    
    // Плавное переключение между формами
    function switchToLogin() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        
        registerForm.classList.remove('active');
        registerForm.classList.add('hidden');
        
        setTimeout(() => {
            loginForm.classList.remove('hidden');
        }, 100);
    }
    
    function switchToRegister() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        
        loginForm.classList.add('hidden');
        
        setTimeout(() => {
            registerForm.classList.add('active');
            registerForm.classList.remove('hidden');
        }, 100);
    }
    
    // Обработчики кнопок
    loginTab.addEventListener('click', switchToLogin);
    registerTab.addEventListener('click', switchToRegister);
    
    // Обработка входа
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = this.querySelector('input[type="text"]').value.trim();
        const password = this.querySelector('input[type="password"]').value.trim();
        const users = JSON.parse(localStorage.getItem('tegrafaUsers'));
        
        // Валидация
        if (!username || !password) {
            showError(this, 'Заполните все поля');
            return;
        }
        
        if (!users[username] || users[username].password !== password) {
            showError(this, 'Неверный логин или пароль');
            return;
        }
        
        // Успешный вход
        localStorage.setItem('currentUser', username);
        redirectToChat();
    });
    
    // Обработка регистрации
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = this.querySelector('input[type="text"]').value.trim();
        const password1 = this.querySelectorAll('input[type="password"]')[0].value.trim();
        const password2 = this.querySelectorAll('input[type="password"]')[1].value.trim();
        const users = JSON.parse(localStorage.getItem('tegrafaUsers'));
        
        // Валидация
        if (!username || !password1 || !password2) {
            showError(this, 'Заполните все поля');
            return;
        }
        
        if (username.length < 3) {
            showError(this, 'Имя должно быть не менее 3 символов');
            return;
        }
        
        if (password1.length < 4) {
            showError(this, 'Пароль должен быть не менее 4 символов');
            return;
        }
        
        if (password1 !== password2) {
            showError(this, 'Пароли не совпадают');
            return;
        }
        
        if (users[username]) {
            showError(this, 'Пользователь уже существует');
            return;
        }
        
        // Регистрация
        users[username] = {
            password: password1,
            registeredAt: new Date().toISOString()
        };
        
        localStorage.setItem('tegrafaUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', username);
        redirectToChat();
    });
    
    // Вспомогательные функции
    function showError(form, message) {
        const errorElement = form.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.marginTop = '10px';
        errorElement.style.textAlign = 'center';
        
        if (!form.querySelector('.error-message')) {
            form.appendChild(errorElement);
        }
        
        // Анимация ошибки
        errorElement.style.animation = 'shake 0.5s';
        setTimeout(() => {
            errorElement.style.animation = '';
        }, 500);
    }
    
    function redirectToChat() {
        // Анимация перед переходом
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s';
        
        setTimeout(() => {
            window.location.href = 'chat.html';
        }, 300);
    }
    
    // Инициализация начального состояния
    switchToLogin();
});

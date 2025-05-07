document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Переключение между вкладками входа и регистрации
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });
    
    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
    
    // Обработка входа
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Простая проверка (в реальном приложении нужна проверка с сервером)
        if (username && password) {
            // Сохраняем пользователя в localStorage
            localStorage.setItem('currentUser', username);
            
            // Перенаправляем в чат
            window.location.href = 'chat.html';
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
    
    // Обработка регистрации
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelectorAll('input[type="text"]')[0].value;
        const password1 = this.querySelectorAll('input[type="password"]')[0].value;
        const password2 = this.querySelectorAll('input[type="password"]')[1].value;
        
        if (password1 !== password2) {
            alert('Пароли не совпадают');
            return;
        }
        
        if (username && password1) {
            // Сохраняем пользователя (в реальном приложении нужно хэшировать пароль)
            localStorage.setItem('currentUser', username);
            
            // Сохраняем учетные данные (небезопасно! только для демо)
            const users = JSON.parse(localStorage.getItem('users') || {};
            users[username] = { password: password1 };
            localStorage.setItem('users', JSON.stringify(users));
            
            // Перенаправляем в чат
            window.location.href = 'chat.html';
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
});

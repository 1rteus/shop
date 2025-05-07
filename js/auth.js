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
    
    // Инициализация хранилища пользователей
    if (!localStorage.getItem('tegrafaUsers')) {
        localStorage.setItem('tegrafaUsers', JSON.stringify({}));
    }
    
    // Обработка входа
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelector('input[type="text"]').value.trim();
        const password = this.querySelector('input[type="password"]').value.trim();
        
        // Получаем всех зарегистрированных пользователей
        const users = JSON.parse(localStorage.getItem('tegrafaUsers'));
        
        // Проверка существования пользователя и пароля
        if (users[username] && users[username].password === password) {
            // Сохраняем текущего пользователя
            localStorage.setItem('currentUser', username);
            
            // Перенаправляем в чат
            window.location.href = 'chat.html';
        } else {
            alert('Неверное имя пользователя или пароль');
            this.querySelector('input[type="password"]').value = '';
        }
    });
    
    // Обработка регистрации
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelectorAll('input[type="text"]')[0].value.trim();
        const password1 = this.querySelectorAll('input[type="password"]')[0].value.trim();
        const password2 = this.querySelectorAll('input[type="password"]')[1].value.trim();
        
        // Получаем всех пользователей
        const users = JSON.parse(localStorage.getItem('tegrafaUsers'));
        
        // Валидация
        if (!username || !password1) {
            alert('Имя пользователя и пароль не могут быть пустыми');
            return;
        }
        
        if (password1 !== password2) {
            alert('Пароли не совпадают');
            return;
        }
        
        if (username.length < 3) {
            alert('Имя пользователя должно быть не менее 3 символов');
            return;
        }
        
        if (password1.length < 4) {
            alert('Пароль должен быть не менее 4 символов');
            return;
        }
        
        if (users[username]) {
            alert('Пользователь с таким именем уже существует');
            return;
        }
        
        // Регистрация нового пользователя
        users[username] = {
            password: password1,
            registeredAt: new Date().toISOString()
        };
        
        localStorage.setItem('tegrafaUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', username);
        
        // Перенаправляем в чат
        window.location.href = 'chat.html';
    });
    
    // Проверка, если пользователь уже авторизован
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'chat.html';
    }
});

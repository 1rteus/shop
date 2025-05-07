document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Элементы интерфейса
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username-display');
    const userAvatar = document.getElementById('user-avatar');
    const onlineCount = document.getElementById('online-count');
    const funButtons = document.querySelectorAll('.fun-btn');
    const themeBtn = document.querySelector('.fun-btn[title="Сменить тему"]');

    // Установка информации о пользователе
    usernameDisplay.textContent = currentUser;
    userAvatar.textContent = currentUser.charAt(0).toUpperCase();
    
    // Цвет аватара
    const colors = ['#4a8fe7', '#e74a4a', '#4ae78f', '#e7b34a', '#8f4ae7'];
    userAvatar.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Загрузка сообщений
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('tegrafaMessages')) || [];
        messagesContainer.innerHTML = '';
        
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.classList.add(msg.sender === currentUser ? 'sent' : 'received');
            
            messageElement.innerHTML = `
                <div class="message-text">${msg.text}</div>
                <div class="message-info">
                    <span class="sender">${msg.sender}</span>
                    <span class="time">${msg.time}</span>
                </div>
            `;
            
            messagesContainer.appendChild(messageElement);
        });
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Отправка сообщения
    function sendMessage() {
        const text = messageInput.value.trim();
        if (!text) return;
        
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const message = {
            sender: currentUser,
            text: text,
            time: time
        };
        
        // Сохранение сообщения
        const messages = JSON.parse(localStorage.getItem('tegrafaMessages')) || [];
        messages.push(message);
        localStorage.setItem('tegrafaMessages', JSON.stringify(messages));
        
        // Очистка поля ввода и обновление чата
        messageInput.value = '';
        loadMessages();
        
        // Имитация ответа (30% chance)
        if (Math.random() < 0.3) {
            setTimeout(sendBotMessage, 1500 + Math.random() * 3000);
        }
    }

    // Ответ бота
    function sendBotMessage() {
        const botMessages = [
            "Привет! Как дела?",
            "Кто-нибудь здесь?",
            "Теграфа - лучший чат!",
            "Я просто бот, не обращайте на меня внимания",
            "Попробуйте нашу секретную функцию 🔮",
            "Какой прекрасный день для общения!",
            "Вы знали, что этот чат полностью на localStorage?",
            "Напишите что-нибудь интересное!"
        ];
        
        const botMessage = {
            sender: "Теграфа-Бот",
            text: botMessages[Math.floor(Math.random() * botMessages.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        const messages = JSON.parse(localStorage.getItem('tegrafaMessages')) || [];
        messages.push(botMessage);
        localStorage.setItem('tegrafaMessages', JSON.stringify(messages));
        loadMessages();
    }

    // Выход из аккаунта
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    // Обновление счетчика онлайн
    function updateOnlineCount() {
        const count = 1 + Math.floor(Math.random() * 15);
        onlineCount.textContent = count;
    }

    // Функции для кнопок
    function sendRandomSticker() {
        const stickers = ['😀', '🤖', '🎉', '❤️', '🔥', '👀', '🚀', '🌈', '👍', '🎯'];
        const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
        messageInput.value += randomSticker;
        messageInput.focus();
    }

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
    }

    function secretFunction() {
        const secretMessages = [
            "Вы активировали секретную функцию!",
            "✨ Магия чата активирована ✨",
            "Теперь вы видите скрытые сообщения",
            "Поздравляем! Вы нашли пасхалку"
        ];
        
        alert(secretMessages[Math.floor(Math.random() * secretMessages.length)]);
    }

    // Обработчики событий
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    logoutBtn.addEventListener('click', logout);
    
    // Назначение функций кнопкам
    funButtons[0].addEventListener('click', sendRandomSticker);
    funButtons[1].addEventListener('click', toggleTheme);
    funButtons[2].addEventListener('click', secretFunction);
    
    // Обновление онлайн каждые 5-10 сек
    setInterval(updateOnlineCount, 5000 + Math.random() * 5000);
    updateOnlineCount();
    
    // Загрузка сообщений при старте
    loadMessages();
});

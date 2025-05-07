document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    
    // Проверка авторизации
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Отображение информации о пользователе
    usernameDisplay.textContent = currentUser;
    userAvatar.textContent = currentUser.charAt(0).toUpperCase();
    
    // Генерация случайного цвета для аватара
    const colors = ['#4a8fe7', '#e74a4a', '#4ae78f', '#e7b34a', '#8f4ae7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    userAvatar.style.backgroundColor = randomColor;
    
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
        
        // Прокрутка вниз
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
        
        // Очистка поля ввода
        messageInput.value = '';
        
        // Обновление сообщений
        loadMessages();
        
        // Имитация ответа (для демо)
        if (Math.random() > 0.7) {
            setTimeout(() => {
                const botMessages = [
                    "Привет! Как дела?",
                    "Кто-нибудь здесь?",
                    "Теграфа - лучший чат!",
                    "Я просто бот, не обращайте на меня внимания",
                    "Попробуйте нашу секретную функцию 🔮"
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
            }, 2000);
        }
    }
    
    // Обработчики событий
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // Имитация онлайн пользователей
    function updateOnlineCount() {
        const count = 1 + Math.floor(Math.random() * 10);
        onlineCount.textContent = count;
    }
    
    // Обновление каждые 5-10 секунд
    setInterval(updateOnlineCount, 5000 + Math.random() * 5000);
    updateOnlineCount();
    
    // Загрузка начальных сообщений
    loadMessages();
    
    // Функциональность кнопок "приколов"
    funButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            switch(index) {
                case 0: // Случайный стикер
                    const stickers = ['😀', '🤖', '🎉', '❤️', '🔥', '👀', '🚀', '🌈'];
                    const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
                    messageInput.value += randomSticker;
                    break;
                    
                case 1: // Смена темы
                    document.body.classList.toggle('light-theme');
                    break;
                    
                case 2: // Секретная функция
                    alert('Секретная функция активирована! Теперь все ваши сообщения будут волшебными ✨');
                    break;
            }
        });
    });
});

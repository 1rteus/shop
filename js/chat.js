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

    // Инициализация пользователя
    usernameDisplay.textContent = currentUser;
    userAvatar.textContent = currentUser.charAt(0).toUpperCase();
    userAvatar.style.backgroundColor = getRandomColor();

    // Подключение к "серверу" (localStorage как временное решение)
    connectToChat();

    // Функции
    function getRandomColor() {
        const colors = ['#4a8fe7', '#e74a4a', '#4ae78f', '#e7b34a', '#8f4ae7'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function connectToChat() {
        // Добавляем пользователя в онлайн
        const onlineUsers = JSON.parse(localStorage.getItem('tegrafaOnlineUsers') || {};
        onlineUsers[currentUser] = new Date().getTime();
        localStorage.setItem('tegrafaOnlineUsers', JSON.stringify(onlineUsers));
        
        // Загружаем сообщения и обновляем онлайн
        loadMessages();
        updateOnlineCount();
        
        // Запускаем периодическое обновление
        setInterval(updateOnlineCount, 5000);
        setInterval(checkOnlineUsers, 10000);
        
        // Слушаем изменения в localStorage (имитация реального чата)
        window.addEventListener('storage', handleStorageEvent);
    }

    function handleStorageEvent(e) {
        if (e.key === 'tegrafaMessages') {
            loadMessages();
        } else if (e.key === 'tegrafaOnlineUsers') {
            updateOnlineCount();
        }
    }

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

    function sendMessage() {
        const text = messageInput.value.trim();
        if (!text) return;
        
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const message = {
            sender: currentUser,
            text: text,
            time: time,
            timestamp: now.getTime()
        };
        
        const messages = JSON.parse(localStorage.getItem('tegrafaMessages')) || [];
        messages.push(message);
        localStorage.setItem('tegrafaMessages', JSON.stringify(messages));
        
        // Обновляем свое сообщение сразу
        loadMessages();
        
        // Очищаем поле ввода
        messageInput.value = '';
        
        // Триггерим событие для других вкладок
        const event = new Event('storage');
        window.dispatchEvent(event);
    }

    function updateOnlineCount() {
        const onlineUsers = JSON.parse(localStorage.getItem('tegrafaOnlineUsers') || {};
        const currentTime = new Date().getTime();
        
        // Удаляем неактивных пользователей (неактивны более 30 сек)
        Object.keys(onlineUsers).forEach(user => {
            if (currentTime - onlineUsers[user] > 30000) {
                delete onlineUsers[user];
            }
        });
        
        localStorage.setItem('tegrafaOnlineUsers', JSON.stringify(onlineUsers));
        onlineCount.textContent = Object.keys(onlineUsers).length;
    }

    function checkOnlineUsers() {
        // Обновляем свое время последней активности
        const onlineUsers = JSON.parse(localStorage.getItem('tegrafaOnlineUsers') || {};
        onlineUsers[currentUser] = new Date().getTime();
        localStorage.setItem('tegrafaOnlineUsers', JSON.stringify(onlineUsers));
        
        // Триггерим событие для других вкладок
        const event = new Event('storage');
        window.dispatchEvent(event);
    }

    function logout() {
        // Удаляем пользователя из онлайн
        const onlineUsers = JSON.parse(localStorage.getItem('tegrafaOnlineUsers') || {};
        delete onlineUsers[currentUser];
        localStorage.setItem('tegrafaOnlineUsers', JSON.stringify(onlineUsers));
        
        // Удаляем текущего пользователя и перенаправляем
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
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

    // Функции для кнопок
    funButtons[0].addEventListener('click', function() {
        const stickers = ['😀', '🤖', '🎉', '❤️', '🔥', '👀', '🚀', '🌈'];
        messageInput.value += stickers[Math.floor(Math.random() * stickers.length)];
        messageInput.focus();
    });

    funButtons[1].addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
    });

    funButtons[2].addEventListener('click', function() {
        alert('🔮 Секретная функция: теперь все ваши сообщения будут волшебными!');
    });

    // Обновляем активность при любом действии пользователя
    document.addEventListener('click', checkOnlineUsers);
    document.addEventListener('keypress', checkOnlineUsers);
});

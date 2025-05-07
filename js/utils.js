// Вспомогательные функции

// Генерация случайного ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Форматирование даты
function formatDate(date) {
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Проверка мобильного устройства
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Анимация "пульсации" элемента
function pulse(element) {
    element.style.transform = 'scale(1.05)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}
